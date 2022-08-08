import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TreeExplorer from '../components/TreeExplorer'
import Sidebar from '../components/Sidebar'
import BinaryExplorer from '../components/BinaryExplorer'
import Button from '../components/Button'
import { ChangeEvent, useState } from 'react'

const Input = ({ onCancel, onChange }: { onCancel: () => void, onChange: (value: string) => void }) => {
  return (<div className="input-element">
    <input type="text"
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
    />
    <div className="cancel-input" onClick={() => onCancel()}>+</div>
  </div>);
}

const FindAtomInfo = (atom: string): any => {

  // default. TODO: find atom info from the /datasource/iso_atoms.yml
  return { info: "Undocumented", atom_name: atom };
}

const Home: NextPage = () => {

  const [searchingAtoms, setSearchingAtoms] = useState(false)
  const [atom, setAtom] = useState(null)

  return (
    <div>
      <Head>
        <title>vidfmt | Video Format Explorer</title>
        <meta name="description" content="Video format explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app-content" style={{ marginBottom: `500px` }}>
        <div className="logo">vidfmt</div>
        <div>ISO Base Media File Format Explorer</div>

        <div style={{ marginTop: '10px' }}>
          {searchingAtoms ?
            <div><Input
              onChange={(val: string) => {
                if (val.length == 4) {
                  setAtom(FindAtomInfo(val));
                } else {
                  setAtom(null);
                }
              }}
              onCancel={() => { setSearchingAtoms(false) }} /></div> :
            <div><Button text="Search Atom" onClick={() => { setSearchingAtoms(true) }} /></div>
          }
        </div>

        <div style={{ marginTop: '20px' }}>
          <TreeExplorer />
        </div>
      </div>
      <Sidebar contents={atom} />
      <BinaryExplorer source={atom} />
    </div>
  )
}

export default Home
