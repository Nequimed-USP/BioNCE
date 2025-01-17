import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const NonSSRHead = dynamic(
  () => import('next/head'),
  {
    ssr: false,
    loading: () => <p>Loading JSME...</p>
  }
);

export function JSMEAcknowledgement() {
  return(
    <Box pt={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href="http://peter-ertl.com/jsme/" target="_blank">JSME</Link>
        : Bruno Bienfait and Peter Ertl,{' '}
        <Link href="http://www.jcheminf.com/content/5/1/24" target="_blank">
          JSME: a free molecule editor in JavaScript
        </Link>
        , <i>Journal of Cheminformatics</i> <strong>5</strong>:24 (2013).
      </Typography>
    </Box>
  );
}

// JSME Molecule Editor
function JSMEComponent({ callback }) {

  useEffect(() => {
    function jsmeOnLoad(status) {
      const jsmeApplet = new JSApplet.JSME("jsme_container", "100%", "100%");
      jsmeApplet.setCallBack(
        "AfterStructureModified",
        () => callback(jsmeApplet.smiles())
      );
    }
    window.jsmeOnLoad = jsmeOnLoad;
  });

  return(
    <>
      <NonSSRHead>
        <script type="text/javascript" src="https://raw.githubusercontent.com/jsme-editor/jsme-editor.github.io/main/dist/jsme/jsme.nocache.js" />
      </NonSSRHead>
      <div id={ "jsme_container" } style={{height: '311px'}} />
    </>
  );
}

export default JSMEComponent;
