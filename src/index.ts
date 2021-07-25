import colors from "tailwindcss/colors";

/**
 * Merge multiple class lists, with toggling and overrides
 *
 * <div className={mergeClasses(
 *   'p-3 text-blue-500',
 *   isActive && 'text-white bg-blue-500 font-semibold'
 * )} />
 *
 * isActive true will return 'p-3 text-white bg-blue-500 font-semibold'
 * isActive false will return 'p-3 text-blue-500'
 *
 * Ispired by
 * https://github.com/robit-dev/tailwindcss-class-combiner#readme
 */

type InputClassList = string | null | false | 0 | undefined;

// Some plugins have the same prefix (eg. fontSize and textColor share "text")
// Add a list of values and a suffix to make their prefix unique
const conflicts = [
  {
    values: [
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
      "8xl",
      "9xl",
    ],
    suffix: "size",
  },
  {
    values: Object.keys(colors),
    suffix: "color",
  },
];

// Build one map to get a conflict-resolving suffix for the key
const conflictResolutionMap = new Map<string, string>();
conflicts.forEach(({ values, suffix }) => {
  values.forEach((value) => {
    conflictResolutionMap.set(value, suffix);
  });
});

interface VariantRegexResult {
  variant: string;
  rawClassName: string;
}

const variantRegex = /^((?<variant>.*):)?(?<rawClassName>.*)$/;

const getKey = (className: string): string => {
  const match = variantRegex.exec(className);
  if (!match) throw new Error(`Failed to parse "${className}"`);

  const { variant, rawClassName } =
    match.groups as unknown as VariantRegexResult; // https://github.com/microsoft/TypeScript/issues/32098
  const [prefix, value] = rawClassName.split("-");

  let utility = prefix;

  // Resolve conflicts between plugings with the same key, ie. text-xl v. text-white
  if (conflictResolutionMap.has(value)) {
    const suffix = conflictResolutionMap.get(value);
    utility = `${utility}-${suffix}`;
  }

  // Add suffix to utility toggles like "ring"
  if (utility === rawClassName) {
    utility = `${utility}-utility`;
  }

  return [variant, utility].filter(Boolean).join("-");
};

const mergeClassLists = (classLists: string[]): string => {
  const classesByPrefix = new Map();

  classLists.forEach((classList: string) => {
    classList.split(" ").forEach((className: string) => {
      const key = getKey(className);
      classesByPrefix.set(key, className);
    });
  });

  return Array.from(classesByPrefix.values()).join(" ");
};

const processInput = (input: InputClassList[]): string => {
  // Filter to strings
  const classLists = input.filter<string>(
    (maybeClassList): maybeClassList is string =>
      !!(maybeClassList && typeof maybeClassList === "string")
  );

  // All entries falsy (allows toggling)
  if (classLists.length === 0) return "";

  // Only one truthy, no need to merge
  if (classLists.length === 1) return classLists[0];

  return mergeClassLists(classLists);
};

const cache = new Map();

const mergeWithCache = (...input: InputClassList[]): string => {
  if (!input.length) return ""; // Nothing passed

  const cacheKey = input.join("");
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const merged = processInput(input);
  cache.set(cacheKey, merged);
  return merged;
};

export default mergeWithCache;
