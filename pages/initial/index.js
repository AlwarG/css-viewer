import { useState } from 'react';
import styles from '../../styles/Home.module.css';

function validateFormWithJS(event) {
  event.preventDefault();
  let { origin } = window.location;
  let { value: searchValue } = event.target[0];
  window.location.href=`${origin}?search=${searchValue}`;
}

function handleInputChange({ target }, setJsonPath) {
  setJsonPath(target.value);
}

let logoStyle = {
  width: '275px',
  margin: '0 auto',
  textAlign: 'center',
  fontSize: '30px',
  height: 'auto'
}

export default function Initial() {
  const [jsonPath, setJsonPath] = useState('');
  return (
    <div className={`modal is-active`}>
      <div className="modal-content">
        <div className={styles.assetsLogo} style={logoStyle}>
          CSS Viewer
        </div>
        <section className="modal-card-body">
        <form className="field has-addons is-justify-content-center mb-0" onSubmit={validateFormWithJS}>
          <div className="control">
            <input
              className="input"
              type="text"
              value={jsonPath}
              onChange={(e) => handleInputChange(e, setJsonPath)}
              placeholder="Please give your json path"
              style={{minWidth: '500px'}}
            />
          </div>
          <div className="control">
            <button className={`button is-link ${styles.linkButton}`}>
              Search
            </button>
          </div>
        </form>
        </section>
      </div>
    </div>
  )
}