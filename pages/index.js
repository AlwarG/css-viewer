import Head from 'next/head';
import Header from './header';
import Initial from './initial';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

function getFullValue({ value, jsonPath }) {
  // This is for prefixing the daomain name with the parent path
  let seprationPath = value.split('/')[0] || '';
  let valuePrefix = jsonPath.split(`/${seprationPath}`)[0] || '';
  return `${valuePrefix}/${value}`;
}

function getAllassets(asset) {
 let assetObj = {};
 JSON.stringify(asset, (key, value) => {
  if (typeof value === 'object'){
    assetObj = {...assetObj, ...getAllassets(asset[key])};
    return value;
  }
  assetObj[key] = value;
  return value;
 });
 return assetObj;
}

async function getAsstesMap({ setData, setLoading, setSelectedpath, setHasSearchUrl }) {
  let jsonPath = (window.location.search || '').split('?search=')[1];

  if (jsonPath) {
    let result = await fetch(jsonPath);
    let resultData = await result.json();
    let assets = getAllassets(JSON.parse(JSON.stringify(resultData)));
  
    let data = (Object.keys(assets) || []).map((key) => {
      let value = assets[key]?.trim();
      if (value?.endsWith('.css')) {
        return {
          key,
          value,
          fullValue: getFullValue({ value, jsonPath })
        };
      }
      return;
    }).filter(Boolean);
    setData(data);
    setLoading(false);
    setSelectedpath(data[0]);
  }
  setHasSearchUrl(!!jsonPath);
}

function getMainsection({ data, isLoading, selectedPath = {}, setSelectedpath }) {
  if (isLoading) {
    return <p>Loading....</p>
  }
  if (data) {
    return (
      <iframe
        id="CSSIframe"
        className={styles.cssStatsIframe}
        title='css-stats'
        src={`https://cssstats.com/stats/?link=${selectedPath.fullValue}`}
      />
    );
  }
}

function getWholeSection({ hasSearchUrl, selectedPath, setSelectedpath, data, isLoading }) {
  if (hasSearchUrl) {
    return (
      <>
        <Header
          selectedPath={selectedPath}
          setSelectedpath={setSelectedpath}
          data={data}
        />
        {getMainsection({ data, isLoading, selectedPath, setSelectedpath })}
      </>
    );
  }
  return (
    <Initial />
  )
}

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedPath, setSelectedpath] = useState({});
  const [hasSearchUrl, setHasSearchUrl] = useState(false);

  useEffect(() => {
    getAsstesMap({ setData, setLoading, setSelectedpath, setHasSearchUrl });
  }, []);

  return (
    <div className={styles.myApp}>
      <Head>
        <title>CSS Viewer</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css"></link>
      </Head>
      <main>
        {getWholeSection({ hasSearchUrl, selectedPath, setSelectedpath, data, isLoading, selectedPath, setSelectedpath, setHasSearchUrl })}
      </main>
    </div>
  )
}
