# Tailshake

Tailshake combines TailwindCSS classes and shakes off any conflicts.

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
    'bg-white rounded',
    classNames
  )}>
    Neat!
  </div>
)

// Customise radius, notice this overrides the default rounded class
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
