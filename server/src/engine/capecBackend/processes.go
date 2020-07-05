package capecBackend

import "enigma/server/src/common/defs"

func InitCapecAnalyze(G *defs.Global) error {
	category := G.Cfg.GetString("resources.capecXMLList.category")
	capecXMLName := G.Cfg.GetString("resources.capecXMLList.fileName")

	if err := GetCapecXML(G, capecXMLName, category); err != nil {
		return err
	}
	if err := ParseCapecXML(G, capecXMLName, category); err != nil {
		return err
	}

	return nil
}
