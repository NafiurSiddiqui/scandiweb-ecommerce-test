# Scandiweb Junior React Dev Test Project

This is a assignment project for a junior dev role in Scandiweb.

## My takes

Below is the explanations of how I approached to solve various problems I faced during the development phasee.

## COMPONENT strucutre

- Maintained core React reusability concept as much as possible.
- This is not it and things can always be updated to a much better version.

## Tech used

- JSX
- React-router
- Sass
- Redux-toolkit
- GraphQL

## Things that are challenging for this project

All of these challenges are tackled down without any third-party libs.

- Finding and rendering content from deeply nested data structure.
- parsing HTML string to pure DOM content
- parsing any HTML entity to pure DOM text content.
- Maintaining dynamicity of the application.
- Implementing heavy algorithms required to achieve certain conditions and functionality.

## Advance proejct consideration

I have not taken care of the optimization since it was not mentioned in the project description provided. If i had to take care of the optmization I would use a combination of `PureComponent` and `shouldComponentUpdate` depending on the use case. If i was to use `shouldComponentUpdate`, I would manually compare the `nextProps` with `this.props` or `nextState` with `this.state` and so on. If something else would require to optimize more, I would go to such extent to take care of the optimization.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
