package defs

import (
	"enigma/server/src/common/utils"
	"io/ioutil"
	"os"
	"time"
)

func (path *TmpPath) Init(G *Global) error {
	_, err := os.Stat(path.Path)
	if err != nil {
		if !os.IsNotExist(err) {
			return err
		}
	}

	if err = os.RemoveAll(path.Path); err != nil {
		return err
	}

	if err = os.Mkdir(path.Path, 0700); err != nil {
		return err
	}

	return nil
}

func (path *TmpPath) SaveByteStreamAsFile(buf []byte, fileName string) (string, error) {
	var tmpFile TmpFile
	tmpFile.fileMaskName = utils.RandStringBytes(32)
	err := ioutil.WriteFile(path.Path + "/" +tmpFile.fileMaskName, buf, 0600)
	if err != nil {
		return "", err
	}
	tmpFile.fileName = fileName
	tmpFile.createDate = time.Now()
	path.filelist = append(path.filelist, tmpFile)

	return tmpFile.fileMaskName, nil
}

func (path *TmpPath) GetFileWithMaskName(fileMaskName string) (*os.File, error) {
	for _, tmpFile := range path.filelist {
		if tmpFile.fileMaskName == fileMaskName {
			return os.Open(path.Path + "/" +tmpFile.fileMaskName)
		}
	}

	return nil, nil
}