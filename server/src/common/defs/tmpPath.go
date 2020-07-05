package defs

import (
	"enigma/server/src/common/utils"
	"io/ioutil"
	"os"
	"time"
)

func (path *TmpPath) Init() error {
	_, err := os.Stat(path.Path)
	if err != nil {
		if !os.IsNotExist(err) {
			return err
		}
	}

	if err = os.RemoveAll(path.Path); err != nil {
		return err
	}

	return os.Mkdir(path.Path, 0700)
}

func (path *TmpPath) SaveByteStreamAsFile(buf []byte, fileName string) (string, error) {
	var tmpFile TmpFile
	tmpFile.fileMaskName = utils.RandStringBytes(32)
	err := ioutil.WriteFile(path.Path+"/"+tmpFile.fileMaskName, buf, 0600)
	if err != nil {
		return "", err
	}
	tmpFile.fileName = fileName
	tmpFile.createDate = time.Now()
	path.filelist = append(path.filelist, tmpFile)

	return tmpFile.fileMaskName, nil
}

func (path *TmpPath) OpenFileWithMaskName(fileMaskName string) (*os.File, error) {
	filepath, err := path.GetFilePathWithMaskName(fileMaskName)
	if err != nil {
		return nil, err
	}

	return os.Open(filepath)
}

func (path *TmpPath) GetFilePathWithMaskName(fileMaskName string) (string, error) {
	for _, tmpFile := range path.filelist {
		if tmpFile.fileMaskName == fileMaskName {
			return path.generateRealPath(fileMaskName), nil
		}
	}

	return "", nil
}

func (path *TmpPath) generateRealPath(fileMaskName string) string {
	return path.Path + "/" + fileMaskName
}

func (path *TmpPath) RemoveFileWithMaskName(fileMaskName string) error {
	for _, tmpFile := range path.filelist {
		if tmpFile.fileMaskName == fileMaskName {
			return os.Remove(path.generateRealPath(fileMaskName))
		}
	}

	return nil
}
