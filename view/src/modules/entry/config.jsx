
import React from 'react'
import ArchiveIcon from '@material-ui/icons/Archive';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CVEImport from '../cveImport/index'
import CWEEnum from '../cweEnum/index'

export default {
    menu: [
        {
            id: "cve-import",
            label: "CVE Import",
            icon: <ArchiveIcon />,
            component: <CVEImport />,
            selected: false,
            disabled: false
        },
        {
            id: "cwe-enum",
            label: "CWE Enum",
            icon: <AccountTreeIcon />,
            component: <CWEEnum />,
            selected: false,
            disabled: false
        }
    ]
}