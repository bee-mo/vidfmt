import { useState } from "react";

const defaultSections = () => {
  return [{
    name: "Section 1",
    content: "Nam congue lacus ut nibh pretium, non tristique felis vehicula. Nulla ac augue at tortor posuere molestie. Vivamus elementum dictum nisl, molestie venenatis eros mattis vehicula. "
  }, {
    name: "Section 2",
    content: 'Vestibulum rutrum sit amet sapien id pellentesque. Maecenas eu porttitor purus. Aliquam rutrum cursus lacinia. Sed lorem nisl, finibus nec suscipit quis, sollicitudin quis lacus. Nulla vestibulum felis eget justo interdum, nec laoreet turpis faucibus. Morbi convallis libero non massa efficitur pulvinar.'
  }, {
    name: "Seciton 3",
    content: "Phasellus congue urna ac erat interdum accumsan. Fusce faucibus congue leo, a ultrices dui aliquet vel. Suspendisse vulputate maximus massa, in vulputate ipsum posuere et. Nullam luctus dui eget elit imperdiet tristique. Sed mattis augue vel velit aliquet consectetur. Fusce fringilla pellentesque massa, tempor efficitur lorem mollis sit amet. Donec facilisis metus non sapien placerat, sit amet elementum leo imperdiet. Etiam sodales mauris vitae dictum egestas."
  }];
}

const Sidebar = () => {

  const [sections, setSection] = useState(defaultSections());

  return (<div className="fullscreen-sidebar">
    {sections.map((info: any, index: number) => <div className="section" key={index}>
      <div className="section-title">{info['name']}</div>
      <div className="section-body">{info['content']}</div>
    </div>)}
  </div>);
}

export default Sidebar