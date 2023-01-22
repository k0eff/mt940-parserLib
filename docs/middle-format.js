const data = {
    "_id": ObjectId("5cf11c11fc774de9387df947"),
        "account": {
        "id": "3"
    },
    "entry": {
        "RvslInd": null,
            "Amt": {
            "currency": "CHF",
                "value": 0.1
        },
        "CdtDbtInd": "DBIT",
            "BookgDt": ISODate("2019-04-01T00:00:00Z"),
                "ValDt": ISODate("2019-04-01T00:00:00Z"),
                    "Sts": "BOOK",
                        "AcctSvcrRef": "DNU6-190331-CS-54828",
                            "AddtlNtryInf": "?21IATCHF CS-41-00 - CS-41-03",
                                "AmtDtls": [
                                    {
                                        "currency": "CHF",
                                        "value": 0.1
                                    }
                                ],
                                    "NtryDtls": {
            "TxDtls": {
                "Amt": {
                    "currency": "CHF",
                        "value": 0.1
                },
                "Refs": {
                    "MsgId": "a721f7d8a2af457fad8e64179f7d8302",
                        "AcctSvcrRef": "DNU6-190331-CS-54828",
                            "PmtInfId": "DNCS-20190331-IXN0",
                                "InstrId": "DNCS-20190331-IXN0-TXN0",
                                    "EndToEndId": "SP-31694222-0"
                },
                "CdtDbtInd": "DBIT",
                    "RltdPties": {
                    "Cdtr": {
                        "Nm": "COMPANY_NAME, CITY",
                            "PstlAdr": {
                            "AdrLine": "COMPANY_NAME, CITY"
                        }
                    },
                    "CdtrAcct": {
                        "Id": {
                            "IBAN": "CH2604XYZXYZXYZXYZXYZ"
                        }
                    }
                },
                "RltdAgts": {
                    "CdtrAgt": {
                        "FinInstnId": {
                            "ClrSysMmbId": {
                                "ClrSysId": {
                                    "Cd": "CHBCC"
                                },
                                "MmbId": "04835"
                            },
                            "Nm": "Credit Suisse (Schweiz) AG",
                                "PstlAdr": {
                                "AdrLine": [
                                    "Paradeplatz 8",
                                    "8070 ZÃ¼rich CH"
                                ]
                            }
                        }
                    }
                },
                "RmtInf": {
                    "Ustrd": "IATCHF CS-41-00 - CS-41-03         IATCHF (Bank fees 2019-Q1)         CS-CH1004835XYZXYZXYZXYZ -         CS-CH2604835XYZXYZXYZXYZ"
                }
            }
        }
    },
    "groupHeader": {
        "CreDtTm": ISODate("2019-04-02T01:22:18.707Z"),
            "MsgId": "CAMT053_20190402_012218707_ZSPDBMNX",
                "MsgPgntn": {
            "PgNb": "1",
                "LastPgInd": true
        }
    },
    "statement": {
        "Id": "b09af4e33f064223a2756f0d55b6395e",
            "ElctrncSeqNb": 64,
                "CreDtTm": ISODate("2019-04-02T01:22:18.709Z"),
                    "FrToDt": {
            "FrDtTm": ISODate("2019-03-31T22:00:00Z"),
                "ToDtTm": ISODate("2019-04-01T21:59:00Z")
        },
        "Acct": {
            "Id": "CH1004835XYZXYZXYZXYZ"
        }
    },
    "sync": 406
}
