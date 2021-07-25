# Tailshake

Tailshake combines TailwindCSS classes and shakes off any conflicts.

```.js
tailshake("text-white", "text-gray-100") // => "text-gray-100"
```

Falsy values are ignored, which means you can use tailshake to easily toggle classlists:

```.js
let isDisabled = false;

tailshake("text-blue-400", isDisabled && "text-gray-400") // => "text-blue-400"

isDisabled = true;

tailshake("text-blue-400", isDisabled && "text-gray-400") // => "text-gray-400"
```

Known issues:

- overrides don't work for classes without a value or unrelated classnames, examples:
  - `border-8` will not override `border`, this is practically ok because the specific class is declared later and wins
  - `block` will not override `flex`, you should use toggling as a workaround (or create a PR with a fix!)
- built assuming a close-to-default Tailwind configuration, no promises when you're using custom plugins and such, please create an issue describing any problems with custom configurations.

## Install

```
yarn add tailshake

// or

npm install tailshake
```

## Usage examples

_Examples use React but the library does not care where you use it. :)_

### Compose classlists for legibility

```.tsx
const Button = (
  <button classNames={tailshake(
    'bg-white text-blue',
    'hover:bg:blue hover:text-white'
  )}>
    Neat, I have hover!
  </button>
)
```

### Compose classlists to allow extension or overrides

```.tsx
const Card = ({ classNames }) => (
  <div classNames={tailshake(
    'bg-white rounded-md',
    classNames
  )}>
    Neat!
  </div>
)

// Customise radius, notice this overrides the default rounded-md class
<Card classNames="rounded-lg">

// Add spacing
<Card classNames="mb-6">
```

### Compose classlists to support multiple styles

```.tsx
const buttonBaseClasses = 'p-3 rounded'
const buttonAppearanceClasses = {
  blue: 'bg-white text-blue',
  red: 'bg-white text-red',
}

const Button = ({ appearance }) =>  (
  <button classNames={tailshake(
    buttonBaseClasses,
    buttonAppearanceClasses[appearance],
  )}>
    Neat!
  </button>
)
```

### Toggle classes

Simple example

```.tsx
<main
  className={mergeClasses(
    'flex flex-col',
    isFullHeight && 'min-h-screen',
  )}
/>
```
