
import React from 'react'
import ArchiveIcon from '@material-ui/icons/Archive';
import CVEImport from '../cveImport/index'

export default {
    menu: [
        {
            id: "cve-import",
            label: "CVE Import",
            icon: <ArchiveIcon />,
            component: <CVEImport />,
            selected: false,
            disabled: false
        }
    ]
}