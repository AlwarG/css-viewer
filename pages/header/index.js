import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css'

function validateFormWithJS(event) {
  event.preventDefault();
  let { origin } = window.location;
  let { value: searchValue } = event.target[0];
  window.location.href=`${origin}?search=${searchValue}`;
}

function handleInputChange({ target }, setJsonPath) {
  setJsonPath(target.value);
}

function getDropDownPart({ data, selectedPath, setSelectedpath }) {
  if (data?.length) {
    return (
      <div className="dropdown is-hoverable pl-3">
        <div className="dropdown-trigger">
          <div className={`button is-link ${styles.linkButton}`} aria-haspopup="true" aria-controls="dropdown-menu">
            <span className={styles.dropDownBtnText} title={selectedPath.key}>{selectedPath.key}</span>
            <svg height="15" width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" xmlSpace="preserve" className={styles.dropDownSVG}>
              <path d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z"/>
            </svg>
          </div>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {data?.map((cssPath) => {
              return (
                <button type="button" className="button is-link is-inverted dropdown-item" key={cssPath.key} onClick={() => setSelectedpath(cssPath)}>
                {cssPath.key}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
  return;
}

export default function Home(props) {
  const [jsonPath, setJsonPath] = useState('');
  const [showInfo, setShowInfo] = useState('');

  useEffect(() => {
    setJsonPath((window.location.search || '').split('?search=')[1] || '')
  }, []);

  return (
    <div className="is-flex is-align-items-center mt-4">
      <div className={styles.assetsLogo}>
        CSS Assets
      </div>
      <form className="field has-addons is-justify-content-center mb-0" onSubmit={validateFormWithJS}>
        <div className="control">
          <input
            className="input"
            type="text"
            value={jsonPath}
            onChange={(e) => handleInputChange(e, setJsonPath)}
            placeholder="Please give your json path"
            style={{minWidth: '700px'}}
          />
        </div>
        <div className="control">
          <button className={`button is-link ${styles.linkButton}`}>
            Search
          </button>
        </div>
      </form>
      {getDropDownPart(props)}
      <div className="ml-auto mr-5">
        <button className={`button py-0 pr-0 pl-2 ${styles.infoBtn}`} onClick={() => setShowInfo('is-active')}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="var(--theme-color)">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
        </button>
        <a href="https://github.com/AlwarG/fingerprinted-css" target="_blank" className={`ml-2 ${styles.link}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        
      </div>
      <div className={`modal ${showInfo}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <h1 className="modal-card-title has-text-weight-bold">CSS Assets Viewer</h1>
            <button className="delete" aria-label="close" onClick={() => setShowInfo('')}></button>
          </header>
          <section className="modal-card-body">
            CSS Assets Viewer is a tool on which the user can view the CSS Styles from various CSS Paths.
            These CSS Paths can be obtained from the assetsMap JSON of your application.
            <br />
            <br />
            <h2 className="has-text-weight-semibold is-size-5">How to use it?</h2>
            <p>
              You can just paste your assetsMap JSON path in the input field and search it. It will list down all the CSS paths.
              You can click the particular path to view the available styles. 
            </p>
            <br />
            <b>Courtesy:</b> This is the inspiration from <a href="https://github.com/cssstats/cssstats" target="_blank">CSS Stats</a>
            <br />
          </section>
          <footer className="modal-card-foot">
            <button className={`button is-link ${styles.linkButton}`} onClick={() => setShowInfo('')}>Ok, Got it</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
