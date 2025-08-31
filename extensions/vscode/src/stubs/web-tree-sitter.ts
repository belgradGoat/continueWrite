// Mock implementation for web-tree-sitter
export interface SyntaxNode {
  type: string;
  text: string;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  startIndex: number;
  endIndex: number;
  children: SyntaxNode[];
  namedChildren: SyntaxNode[];
  parent: SyntaxNode | null;
  nextSibling: SyntaxNode | null;
  previousSibling: SyntaxNode | null;
  childCount: number;
  namedChildCount: number;
  child(index: number): SyntaxNode | null;
  namedChild(index: number): SyntaxNode | null;
  childForFieldName(fieldName: string): SyntaxNode | null;
  descendantForPosition(position: { row: number; column: number }): SyntaxNode;
  descendantsOfType(type: string): SyntaxNode[];
  equals(other: SyntaxNode): boolean;
}

export interface Tree {
  rootNode: SyntaxNode;
}

export interface QueryCapture {
  name: string;
  node: SyntaxNode;
}

export interface Query {
  matches(node: SyntaxNode): any[];
  captures(node: SyntaxNode): QueryCapture[];
}

export interface Language {
  query(queryString: string): Query;
}

export interface Parser {
  parse(input: string, oldTree?: Tree, options?: any): Tree;
  setLanguage(language: Language): void;
}

// Export Parser namespace for type compatibility  
export namespace Parser {
  export interface SyntaxNode {
    type: string;
    text: string;
    startPosition: { row: number; column: number };
    endPosition: { row: number; column: number };
    startIndex: number;
    endIndex: number;
    children: SyntaxNode[];
    namedChildren: SyntaxNode[];
    parent: SyntaxNode | null;
    nextSibling: SyntaxNode | null;
    previousSibling: SyntaxNode | null;
  }
  export interface Tree {
    rootNode: SyntaxNode;
  }
  export interface Language {
    query(queryString: string): Query;
  }
  export interface QueryCapture {
    name: string;
    node: SyntaxNode;
  }
  export interface Query {
    matches(node: SyntaxNode): any[];
    captures(node: SyntaxNode): QueryCapture[];
  }
}

class MockParser implements Parser {
  parse(input: string, oldTree?: Tree, options?: any): Tree {
    const mockNode: SyntaxNode = {
      type: "program",
      text: input,
      startPosition: { row: 0, column: 0 },
      endPosition: { row: 0, column: input.length },
      startIndex: 0,
      endIndex: input.length,
      children: [],
      namedChildren: [],
      parent: null,
      nextSibling: null,
      previousSibling: null,
      childCount: 0,
      namedChildCount: 0,
      child: (index: number) => null,
      namedChild: (index: number) => null,
      childForFieldName: (fieldName: string) => null,
      descendantForPosition: (position: { row: number; column: number }) => mockNode,
      descendantsOfType: (type: string) => [],
      equals: (other: SyntaxNode) => false,
    };
    return {
      rootNode: mockNode
    };
  }
  setLanguage(language: Language): void {}
}

// Create a function that also acts as a constructor
interface ParserConstructorInterface {
  (): MockParser;
  new(): MockParser;
  SyntaxNode: any;
  Tree: any;
  Language: any;
  Query: any;
  init(): Promise<void>;
}

const ParserConstructor = function(this: any) {
  if (new.target) {
    return new MockParser();
  }
  return new MockParser();
} as ParserConstructorInterface;

// Add namespace properties to the constructor function
ParserConstructor.SyntaxNode = {} as any;
ParserConstructor.Tree = {} as any;
ParserConstructor.Language = {} as any;
ParserConstructor.Query = {} as any;
ParserConstructor.init = async () => {};

// Use declaration merging to add the namespace
declare namespace ParserConstructor {
  export interface SyntaxNode {
    type: string;
    text: string;
    startPosition: { row: number; column: number };
    endPosition: { row: number; column: number };
    startIndex: number;
    endIndex: number;
    children: SyntaxNode[];
    namedChildren: SyntaxNode[];
    parent: SyntaxNode | null;
    nextSibling: SyntaxNode | null;
    previousSibling: SyntaxNode | null;
    childCount: number;
    namedChildCount: number;
    child(index: number): SyntaxNode | null;
    namedChild(index: number): SyntaxNode | null;
    childForFieldName(fieldName: string): SyntaxNode | null;
    descendantForPosition(position: { row: number; column: number }): SyntaxNode;
    descendantsOfType(type: string): SyntaxNode[];
    equals(other: SyntaxNode): boolean;
  }
  export interface Point {
    row: number;
    column: number;
  }
  export interface Tree {
    rootNode: SyntaxNode;
  }
  export interface Language {
    query(queryString: string): Query;
  }
  export interface Query {
    matches(node: SyntaxNode): any[];
    captures(node: SyntaxNode): QueryCapture[];
  }
  export interface QueryMatch {
    pattern: number;
    captures: any[];
  }
}

export default ParserConstructor;