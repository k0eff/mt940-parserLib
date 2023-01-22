const data = {
    type: "payment", // payment = money got into acocunt | payout = well, money payed out of the account
    psp: {
        type: "wire_transfer",
        id: "5d2ec9630adbf9cd1b94b21d",
        source: {
            id: "CH6904835XYZXYZXYZXYZ", // IBAN of our own company account / subject account / where the transaction occured
        }
    },
    info: {
        reference: ["Kunden NR: 001BTR59"], // array of strings reference that we got from format
        depositor: {
            name: "NAME MIDDLENAME LASTNAME", // name of depositor
            address: {
                address_lines: [
                    "Kohlfirststrasse 5",
                    "8252 Schlatt TG",
                ],
                country: "CH",
            },
            iban: "CH129XYZXYZXYZ" // iban of the depositor
        },
        bank_reference: { // various data availabale from bank about the transaction
            MsgId: "13SN-190716-MS-10071",
            AcctSvcrRef: "80VA-190716-CS-85335",
            PmtInfId: "13SN-190716-MS-10071",
            EndToEndId: "NOTPROVIDED"
        },
        booking_date: "2019-07-16T00:00:00.000Z" // booking date
    },
    amount: {
        currency: "CHF",
        value: 174.12
    },
    value_date: "2019-07-16T00:00:00.000Z" // value date
};