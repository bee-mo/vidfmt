import React, { useState } from "react";

const defaultTree = () => {
  return {
    name: ".MP4",
    children: [{
      name: "moov",
      children: [{
        name: "cmov",
        children: [{
          name: "dcom"
        }, {
          name: "cmvd"
        }]
      }]
    }, {
      name: "mvhd"
    }, {
      name: "trak"
    }]
  };
}

let el_ct = 0;
const GenerateTreeExplorer = (tree: any, level: number = 0): [React.ReactElement, number] => {
  ++el_ct;
  if (tree == null) {
    return [React.createElement('div', { key: el_ct }), 0];
  }

  let child_nodes = null;
  let num_children = 0;
  if ('children' in tree) {
    const res = tree['children'].map((child: any) => GenerateTreeExplorer(child, level + 1));

    child_nodes = res.map((el: [React.ReactElement, number]) => el[0]);
    num_children = res.reduce((prev: number, curr: [React.ReactElement, number]) => prev + curr[1], 0);
  }

  // style={{ height: `${8 + (num_children * (37))}px` }}
  let name = 'name' in tree ? tree['name'] : '<null>';
  return [React.createElement('div', { className: `tree-child ${num_children == 0 ? 'tree-leaf' : ''}`, key: el_ct }, <>
    {level == 0 ? <div /> : [<div className="roots-of-child-node" key="0" />, <div className="roots-of-tree" key="1" />]}
    <div className="tree-node">{name}</div>
    <div className="tree-children" style={{ marginLeft: `${25}px` }}>
      {child_nodes}
    </div>
  </>), num_children + 1];
}

const TreeExplorer = () => {

  const [tree, setStree] = useState(defaultTree());

  return (<div className="tree-explorer">
    {GenerateTreeExplorer(tree)[0]}

    {/* <div className="tree-node">Tree Root Node</div>
    <div className="tree-children" style={{ marginLeft: '25px' }}>
      <div className="roots-of-tree" />
      <div className="tree-child">
        <div className="roots-of-child-node" />
        <div className="tree-node">Tree Child #1</div>
      </div>
      <div className="tree-child">
        <div className="roots-of-child-node" />
        <div className="tree-node">Tree Child #2</div>
      </div>
      <div className="tree-child">
        <div className="roots-of-child-node" />
        <div className="tree-node">Tree Child #2</div>
      </div>
    </div> */}
  </div>);
}

export default TreeExplorer