import { useRef, useState } from "react";

const defaultBuffer = (): number[] => {

  const kSize = 500;
  let view: number[] = [];
  for (let i = 0; i < kSize; ++i) {
    view.push(i % 256);
  }

  return view;
}

enum ViewType { kBinary, kHex, kChar };

const kHexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const HexValue = (num: number): string => {
  let s = '';

  while (num > 0) {
    const val = num % 16;
    s = kHexChars[val] + s;
    num = Math.floor(num / 16);
  }
  if (s.length == 0) {
    return '0x00';
  }
  if (s.length < 2) {
    s = '0' + s;
  }

  return '0x' + s;
}

const GetViewTypeValue = (value: number, type: ViewType): string => {
  switch (type) {
    case ViewType.kBinary:
      return (value % 256).toString();
    case ViewType.kChar:
      return String.fromCharCode(value);
    case ViewType.kHex:
      return HexValue(value);
  }
  return value.toString();
}

const ViewExplorer = ({ buffer, view_type, onSelect, selected_i }:
  { buffer: number[], view_type: ViewType, onSelect: (i: number) => ((e: any) => any), selected_i: number }) => {

  return (<div className="binary-view-grid">
    {buffer.map((el: any, i: number) =>
      <span key={i} className={i == selected_i ? 'selected' : ''} onMouseOver={onSelect(i)}>
        {GetViewTypeValue(el, view_type)}
      </span>)}
  </div>);
}

const SyncScroll = (view1: any, view2: any) => {
  return (e: any) => {
    if (view1.current != null) {
      view1.current.scrollTop = e.target.scrollTop;
      view1.current.scrollLeft = e.target.scrollLeft;
    }
    if (view2.current != null) {
      view2.current.scrollTop = e.target.scrollTop;
      view2.current.scrollLeft = e.target.scrollLeft;
    }
  }
}

const BinaryExplorer = () => {

  const [buffer, setBuffer] = useState(defaultBuffer());
  const [selectedByte, setSelectedByte] = useState(-1);

  const view1 = useRef(null);
  const view2 = useRef(null);
  const view3 = useRef(null);

  return (<div className="binary-explorer">
    <div className="section-title">Binary Explorer</div>

    <div className="binary-explorer-views">
      <div className="binary-explorer-view" onScroll={SyncScroll(view2, view3)} ref={view1}>
        <ViewExplorer buffer={buffer} view_type={ViewType.kBinary}
          selected_i={selectedByte}
          onSelect={(i: number) => {
            return (e: any) => {
              setSelectedByte(i);
            }
          }}
        />
      </div>
      <div className="binary-explorer-view" onScroll={SyncScroll(view1, view3)} ref={view2}>
        <ViewExplorer buffer={buffer} view_type={ViewType.kChar}
          selected_i={selectedByte}
          onSelect={(i: number) => {
            return (e: any) => {
              setSelectedByte(i);
            }
          }}
        />
      </div>
      <div className="binary-explorer-view" onScroll={SyncScroll(view1, view2)} ref={view3}>
        <ViewExplorer buffer={buffer} view_type={ViewType.kHex}
          selected_i={selectedByte}
          onSelect={(i: number) => {
            return (e: any) => {
              setSelectedByte(i);
            }
          }}
        />
      </div>
    </div>
  </div>)
}

export default BinaryExplorer;