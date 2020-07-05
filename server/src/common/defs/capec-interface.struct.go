package defs

import "encoding/xml"

/**
 * Capec Analyze Status
 */
type CapecAnalyzeInfo struct {
	FullSize    int `json:"fullsize"`
	CurrentSize int `json:"currentsize"`
}

/**
 * Capec Original XML Struct
 */
type CapecXML struct {
	XMLName        xml.Name `xml:"Attack_Pattern_Catalog"`
	Text           string   `xml:",chardata"`
	Xmlns          string   `xml:"xmlns,attr"`
	Xhtml          string   `xml:"xhtml,attr"`
	Xsi            string   `xml:"xsi,attr"`
	Name           string   `xml:"Name,attr"`
	Version        string   `xml:"Version,attr"`
	Date           string   `xml:"Date,attr"`
	SchemaLocation string   `xml:"schemaLocation,attr"`
	AttackPatterns struct {
		Text          string `xml:",chardata"`
		AttackPattern []struct {
			Text                  string `xml:",chardata"`
			ID                    string `xml:"ID,attr"`
			Name                  string `xml:"Name,attr"`
			Abstraction           string `xml:"Abstraction,attr"`
			Status                string `xml:"Status,attr"`
			Description           string `xml:"Description"`
			LikelihoodOfAttack    string `xml:"Likelihood_Of_Attack"`
			TypicalSeverity       string `xml:"Typical_Severity"`
			RelatedAttackPatterns struct {
				Text                 string `xml:",chardata"`
				RelatedAttackPattern []struct {
					Text           string `xml:",chardata"`
					Nature         string `xml:"Nature,attr"`
					CAPECID        string `xml:"CAPEC_ID,attr"`
					ExcludeRelated []struct {
						Text      string `xml:",chardata"`
						ExcludeID string `xml:"Exclude_ID,attr"`
					} `xml:"Exclude_Related"`
				} `xml:"Related_Attack_Pattern"`
			} `xml:"Related_Attack_Patterns"`
			ExecutionFlow struct {
				Text       string `xml:",chardata"`
				AttackStep []struct {
					Text        string `xml:",chardata"`
					Step        string `xml:"Step"`
					Phase       string `xml:"Phase"`
					Description struct {
						Text string   `xml:",chardata"`
						P    []string `xml:"p"`
						Div  struct {
							Text  string `xml:",chardata"`
							Style string `xml:"style,attr"`
							Class string `xml:"class,attr"`
							Ul    struct {
								Text string   `xml:",chardata"`
								Li   []string `xml:"li"`
							} `xml:"ul"`
							Br []string `xml:"br"`
						} `xml:"div"`
					} `xml:"Description"`
					Technique []struct {
						Text string   `xml:",chardata"`
						P    []string `xml:"p"`
						Div  []struct {
							Text  string `xml:",chardata"`
							Style string `xml:"style,attr"`
							Class string `xml:"class,attr"`
						} `xml:"div"`
					} `xml:"Technique"`
				} `xml:"Attack_Step"`
			} `xml:"Execution_Flow"`
			Prerequisites struct {
				Text         string   `xml:",chardata"`
				Prerequisite []string `xml:"Prerequisite"`
			} `xml:"Prerequisites"`
			SkillsRequired struct {
				Text  string `xml:",chardata"`
				Skill []struct {
					Text  string `xml:",chardata"`
					Level string `xml:"Level,attr"`
				} `xml:"Skill"`
			} `xml:"Skills_Required"`
			ResourcesRequired struct {
				Text     string `xml:",chardata"`
				Resource struct {
					Text string   `xml:",chardata"`
					P    []string `xml:"p"`
				} `xml:"Resource"`
			} `xml:"Resources_Required"`
			Consequences struct {
				Text        string `xml:",chardata"`
				Consequence []struct {
					Text   string   `xml:",chardata"`
					Scope  []string `xml:"Scope"`
					Impact []string `xml:"Impact"`
					Note   string   `xml:"Note"`
				} `xml:"Consequence"`
			} `xml:"Consequences"`
			Mitigations struct {
				Text       string `xml:",chardata"`
				Mitigation []struct {
					Text string   `xml:",chardata"`
					P    []string `xml:"p"`
					Div  []struct {
						Text  string `xml:",chardata"`
						Style string `xml:"style,attr"`
						Class string `xml:"class,attr"`
						Div   []struct {
							Text  string   `xml:",chardata"`
							Style string   `xml:"style,attr"`
							Br    []string `xml:"br"`
							Div   struct {
								Text  string `xml:",chardata"`
								Style string `xml:"style,attr"`
								Br    string `xml:"br"`
							} `xml:"div"`
							I string `xml:"i"`
						} `xml:"div"`
						Br string `xml:"br"`
						Ul struct {
							Text string   `xml:",chardata"`
							Li   []string `xml:"li"`
						} `xml:"ul"`
					} `xml:"div"`
				} `xml:"Mitigation"`
			} `xml:"Mitigations"`
			ExampleInstances struct {
				Text    string `xml:",chardata"`
				Example []struct {
					Text string   `xml:",chardata"`
					P    []string `xml:"p"`
					Div  []struct {
						Text  string `xml:",chardata"`
						Style string `xml:"style,attr"`
						Class string `xml:"class,attr"`
						Div   []struct {
							Text  string `xml:",chardata"`
							Style string `xml:"style,attr"`
							I     string `xml:"i"`
							Div   []struct {
								Text  string `xml:",chardata"`
								Style string `xml:"style,attr"`
								I     string `xml:"i"`
								Div   struct {
									Text  string `xml:",chardata"`
									Style string `xml:"style,attr"`
									I     string `xml:"i"`
									Br    string `xml:"br"`
								} `xml:"div"`
								Br string `xml:"br"`
							} `xml:"div"`
							Br []string `xml:"br"`
						} `xml:"div"`
						Br []string `xml:"br"`
						Ul struct {
							Text string   `xml:",chardata"`
							Li   []string `xml:"li"`
						} `xml:"ul"`
					} `xml:"div"`
				} `xml:"Example"`
			} `xml:"Example_Instances"`
			RelatedWeaknesses struct {
				Text            string `xml:",chardata"`
				RelatedWeakness []struct {
					Text  string `xml:",chardata"`
					CWEID string `xml:"CWE_ID,attr"`
				} `xml:"Related_Weakness"`
			} `xml:"Related_Weaknesses"`
			TaxonomyMappings struct {
				Text            string `xml:",chardata"`
				TaxonomyMapping []struct {
					Text         string `xml:",chardata"`
					TaxonomyName string `xml:"Taxonomy_Name,attr"`
					EntryID      string `xml:"Entry_ID"`
					EntryName    string `xml:"Entry_Name"`
				} `xml:"Taxonomy_Mapping"`
			} `xml:"Taxonomy_Mappings"`
			ContentHistory struct {
				Text       string `xml:",chardata"`
				Submission struct {
					Text                   string `xml:",chardata"`
					SubmissionName         string `xml:"Submission_Name"`
					SubmissionOrganization string `xml:"Submission_Organization"`
					SubmissionDate         string `xml:"Submission_Date"`
				} `xml:"Submission"`
				Modification []struct {
					Text                     string `xml:",chardata"`
					ModificationName         string `xml:"Modification_Name"`
					ModificationOrganization string `xml:"Modification_Organization"`
					ModificationDate         string `xml:"Modification_Date"`
					ModificationComment      string `xml:"Modification_Comment"`
				} `xml:"Modification"`
				PreviousEntryName []struct {
					Text string `xml:",chardata"`
					Date string `xml:"Date,attr"`
				} `xml:"Previous_Entry_Name"`
			} `xml:"Content_History"`
			Indicators struct {
				Text      string   `xml:",chardata"`
				Indicator []string `xml:"Indicator"`
			} `xml:"Indicators"`
			References struct {
				Text      string `xml:",chardata"`
				Reference []struct {
					Text                string `xml:",chardata"`
					ExternalReferenceID string `xml:"External_Reference_ID,attr"`
					Section             string `xml:"Section,attr"`
				} `xml:"Reference"`
			} `xml:"References"`
			Notes struct {
				Text string `xml:",chardata"`
				Note []struct {
					Text string   `xml:",chardata"`
					Type string   `xml:"Type,attr"`
					P    []string `xml:"p"`
				} `xml:"Note"`
			} `xml:"Notes"`
			AlternateTerms struct {
				Text          string `xml:",chardata"`
				AlternateTerm struct {
					Text string `xml:",chardata"`
					Term string `xml:"Term"`
				} `xml:"Alternate_Term"`
			} `xml:"Alternate_Terms"`
		} `xml:"Attack_Pattern"`
	} `xml:"Attack_Patterns"`
	Categories struct {
		Text     string `xml:",chardata"`
		Category []struct {
			Text          string `xml:",chardata"`
			ID            string `xml:"ID,attr"`
			Name          string `xml:"Name,attr"`
			Status        string `xml:"Status,attr"`
			Summary       string `xml:"Summary"`
			Relationships struct {
				Text      string `xml:",chardata"`
				HasMember []struct {
					Text    string `xml:",chardata"`
					CAPECID string `xml:"CAPEC_ID,attr"`
				} `xml:"Has_Member"`
			} `xml:"Relationships"`
			ContentHistory struct {
				Text       string `xml:",chardata"`
				Submission struct {
					Text                   string `xml:",chardata"`
					SubmissionName         string `xml:"Submission_Name"`
					SubmissionOrganization string `xml:"Submission_Organization"`
					SubmissionDate         string `xml:"Submission_Date"`
				} `xml:"Submission"`
				Modification []struct {
					Text                     string `xml:",chardata"`
					ModificationName         string `xml:"Modification_Name"`
					ModificationOrganization string `xml:"Modification_Organization"`
					ModificationDate         string `xml:"Modification_Date"`
					ModificationComment      string `xml:"Modification_Comment"`
				} `xml:"Modification"`
			} `xml:"Content_History"`
			TaxonomyMappings struct {
				Text            string `xml:",chardata"`
				TaxonomyMapping struct {
					Text         string `xml:",chardata"`
					TaxonomyName string `xml:"Taxonomy_Name,attr"`
					EntryID      string `xml:"Entry_ID"`
					EntryName    string `xml:"Entry_Name"`
				} `xml:"Taxonomy_Mapping"`
			} `xml:"Taxonomy_Mappings"`
		} `xml:"Category"`
	} `xml:"Categories"`
	Views struct {
		Text string `xml:",chardata"`
		View struct {
			Text      string `xml:",chardata"`
			ID        string `xml:"ID,attr"`
			Name      string `xml:"Name,attr"`
			Type      string `xml:"Type,attr"`
			Status    string `xml:"Status,attr"`
			Objective string `xml:"Objective"`
			Members   struct {
				Text      string `xml:",chardata"`
				HasMember []struct {
					Text    string `xml:",chardata"`
					CAPECID string `xml:"CAPEC_ID,attr"`
				} `xml:"Has_Member"`
			} `xml:"Members"`
			Notes struct {
				Text string `xml:",chardata"`
				Note struct {
					Text string `xml:",chardata"`
					Type string `xml:"Type,attr"`
				} `xml:"Note"`
			} `xml:"Notes"`
			ContentHistory struct {
				Text       string `xml:",chardata"`
				Submission struct {
					Text                   string `xml:",chardata"`
					SubmissionName         string `xml:"Submission_Name"`
					SubmissionOrganization string `xml:"Submission_Organization"`
					SubmissionDate         string `xml:"Submission_Date"`
				} `xml:"Submission"`
				Modification struct {
					Text                     string `xml:",chardata"`
					ModificationName         string `xml:"Modification_Name"`
					ModificationOrganization string `xml:"Modification_Organization"`
					ModificationDate         string `xml:"Modification_Date"`
					ModificationComment      string `xml:"Modification_Comment"`
				} `xml:"Modification"`
			} `xml:"Content_History"`
		} `xml:"View"`
	} `xml:"Views"`
	ExternalReferences struct {
		Text              string `xml:",chardata"`
		ExternalReference []struct {
			Text             string   `xml:",chardata"`
			Capec            string   `xml:"capec,attr"`
			ReferenceID      string   `xml:"Reference_ID,attr"`
			Author           []string `xml:"Author"`
			Title            string   `xml:"Title"`
			PublicationYear  string   `xml:"Publication_Year"`
			PublicationMonth string   `xml:"Publication_Month"`
			Publisher        string   `xml:"Publisher"`
			URL              string   `xml:"URL"`
			Publication      string   `xml:"Publication"`
			PublicationDay   string   `xml:"Publication_Day"`
			Edition          string   `xml:"Edition"`
		} `xml:"External_Reference"`
	} `xml:"External_References"`
}
