# React Select Files
Provide React component with a function to help select files.

## Usage

```
import withSelectFiles from 'react-select-files'

const MyComponent1 = withSelectFiles('selectFiles')(
  function ({selectFiles}) {
    return <button onClick={() => selectFiles().then(files => console.log(files))}>select file</button>
  }
)

// select files with options
const MyComponent2 = withSelectFiles('selectFiles')(
  function ({selectFiles}) {
    return <button onClick={() => selectFiles({accept: 'image/*', multiple: true}).then(files => console.log(files))}>select images</button>
  }
)
```

## APIs

### withSelectFiles(functionName) => {HOC} hoc
This function receives a function name and returns a HOC.

### hoc(Component) => Component 
This hoc provides the inner component with a function (referenced as `selectFiles`) as a prop using the function name given before. 

### selectFiles(options) => promise => files
This function returns a promise which resolves to the files user selected.

It can also receive an object as options which will be spread directly into the inner input element.

## Limitations
Currently, if the user did not select any file, the promise will never be resolved.
This is because the `onChange` callback will not be triggered if user select no file. 
So, by now, I suggest you design your code not to expect the promise to be resolved.
If you have any solution to this issue, please send an issue or PR, thanks!

## License
MIT