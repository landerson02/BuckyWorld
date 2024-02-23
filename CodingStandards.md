# BuckyWorld Coding Standards

## Purpose

This document serves to give clear guidelines for code written in this project to make it more readable, more consistent, and easier to maintain. This serves to be a set of guidelines that can be revised and improved on according to the situation.

## Naming Conventions

### Variables and Methods

- Use camelCase
- Make variables descriptive (iteration variables as ‘i’ is fine)
- Verbs for methods

Ex: 

	// Good
	int distance = getEdgeLength();

	// Bad
	int d = getEdgeLength();

### Classes
- Use PascalCase for classes
- Use nouns as names

Ex: 

	class Node {
		Node[] getNeighbors() {
			// ...
		}
	}

## Formatting and Indentation

- Use 4 spaces per tab for indentation (?)
- Limit lines to 100 characters (?)

Ex: 

	//Add example here


## Comments
- Add javadoc comments for documentation
- Write clear and concise comments

Ex: 

	/**
	* Conducts a breadth first search of the graph to find a 
	* specified target node.
	* 
	* @param target The target node the method is looking for
	* @return True if the node was found, False if not.
	*/
	public boolean BreadthFirstSearch(Node target ) {
		// ...
	}

## Code Organization
- Organize code into packages and logical sections.
- Follow the Java package naming conventions.

Ex: 

	// Good
	package com.example.project.module1;

	import com.example.project.module2.*;

	public class Main {
		// ...
	}

	// Avoid
	import project.module2.*;
	import project.module1.*;

	public class Main { }


## Testing Standards
- Write unit tests for all methods and classes.
- Use a testing framework such as JUnit.
- Name test methods descriptively.

Ex: 

	// Good
	@Test
	public void testBreadthFirstSearch() {
		// ...
	}

	// Avoid
	@Test
	public void tbfs() {
		// ...
	}

## Version Control
- Write meaningful commit messages

Ex: 
	//Good
	git commit -m "Add unit tests for breadthFirstSearch method"

	//Avoid
	git commit -m "Update"

## Enforcement and Process
- Team members should review their own code to make sure standards are being met
	- Checkstyle for Java 
	- ESLint for JavaScript
	- Prettier for general formatting
- Regularly review and update the standards as needed with input from team members
- Address any concerns with the standards at team meetings

