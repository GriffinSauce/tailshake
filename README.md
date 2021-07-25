# Tailshake

Tailshake combines TailwindCSS classes and shakes off any conflicts.

```.js
tailshake("text-white", "text-gray-100") // => "text-gray-100"
```

Falsy values are ignored, which means you can use tailshake to easily toggle classlists:

```.js
tailshake("text-blue-400", isDisabled && "text-gray-400")

isDisabled = false // => "text-blue-400"
isDisabled = true // => "text-gray-400"
```

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
  <button className={tailshake(
    'bg-white text-blue',
    'hover:bg:blue hover:text-white'
  )}>
    Neat, I have hover!
  </button>
)
```

### Compose classlists to allow extension or overrides

```.tsx
const Card = ({ className }) => (
  <div className={tailshake(
    'bg-white rounded-md',
    className
  )}>
    Neat!
  </div>
)

// Customise radius, notice this overrides the default rounded-md class
<Card className="rounded-lg">

// Add spacing
<Card className="mb-6">
```

### Compose classlists to support multiple styles

```.tsx
const buttonBaseClasses = 'p-3 rounded'
const buttonAppearanceClasses = {
  blue: 'bg-white text-blue',
  red: 'bg-white text-red',
}

const Button = ({ appearance }) =>  (
  <button className={tailshake(
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

## Known issues

_Nobody is perfect._

- overrides don't work for classes without a value or unrelated classnames, examples:
  - `border-8` will not override `border`, this is practically ok because the specific class is declared later and wins
  - `block` will not override `flex`, you should use toggling as a workaround (or create a PR with a fix!)
- this library assumes a close-to-default Tailwind configuration, so no promises when you're using custom plugins lots of customisation. Please do create an issue describing any problems with custom configurations!

## Alternatives

Some other options you might consider:

- [tailwindcss-class-combiner](https://github.com/robit-dev/tailwindcss-class-combiner#readme)
- [tailwind-classlist](https://github.com/seancdinan/tailwind-classlist)

Both of these packages appear to be unmaintained, they have served as inspiration for the approach and test cases for Tailshake.
