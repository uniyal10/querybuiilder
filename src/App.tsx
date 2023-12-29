import "./styles.css";
import { useState } from "react";

const selectJSON = [
  {
    key: "applicant.gender",
    label: "Gender",
    type: "multi_select",
    options: ["male", "female", "others"],
    operators: ["in", "nin"],
  },
  {
    key: "applicant.age",
    label: "Age",
    type: "number",
    operators: [">", ">=", "<", "<="],
  },
  {
    key: "applicant.current_address_ownership",
    label: "Current Address Ownership",
    type: "multi_select",
    options: ["rented", "owned"],
    operators: ["in", "nin"],
  },
  {
    key: "business.business_type",
    label: "Business",
    type: "multi_select",
    operators: ["in", "nin"],
    options: [
      "proprietorship",
      "llp",
      "partnership",
      "private_limited",
      "limited",
      "individual",
    ],
  },
  {
    key: "business.overall_vintage",
    label: "Overall Business Vintage",
    type: "number",
    operators: [">", ">=", "<", "<="],
    value_suffix: "months",
  },
  {
    key: "business.vintage_with_partner_in_months",
    label: "Vintage with Partner",
    type: "number",
    operators: [">", ">=", "<", "<="],
    value_suffix: "months",
  },
  {
    key: "business.current_address_ownership",
    label: "Current Address Ownership",
    type: "multi_select",
    options: ["rented", "owned"],
    operators: ["in", "nin"],
  },
  {
    key: "business.brand",
    label: "Brand",
    type: "multi_select",
    options: ["apple", "samsung", "nothing"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_authenticity",
    label: "Business Authenticity",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_authenticity.name_match",
    label: "Business Name Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_authenticity.business_type_match",
    label: "Business Type Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_authenticity.address_match",
    label: "Business Address Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_authenticity.incorporation_year_match",
    label: "Business Incorporation Year Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_person_check",
    label: "Business Person Check",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_person_check.name_match",
    label: "Business Person Name Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.business_person_check.gst_pan_link_match",
    label: "Business GST PAN Link",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.person_authenticity",
    label: "Person Authenticity",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.person_authenticity.name_match",
    label: "Person Name Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.person_authenticity.father_name_match",
    label: "Person's Father Name Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.person_authenticity.address_match",
    label: "Person Address Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.person_authenticity.dob_match",
    label: "Person DOB Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "matrix_data.bank_account_authenticity.name_match",
    label: "Bank Name Match",
    type: "multi_select",
    options: ["R", "Y", "G"],
    operators: ["in", "nin"],
  },
  {
    key: "{applicant_type}.bureau-score", //applicant_type can be business or applicant
    label: "Bureau Score",
    type: "number",
    operators: ["=", ">", ">=", "<", "<="],
  },
  {
    key: "{applicant_type}.bureau-accounts", //applicant_type can be business or applicant
    label: "Loan Accounts",
    type: "number",
    operators: ["=", ">", ">=", "<", "<="],
    filters: [
      {
        key: "period",
        label: "Period",
        type: "period",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "account_date",
        label: "Account Date",
        type: "select",
        choices: ["date_open", "date_close"],
      },
      {
        key: "report_date",
        label: "Report Date",
        type: "select",
        choices: ["reported_date", "current_date"],
      },
      {
        key: "vintage",
        label: "with vintage",
        type: "vintage",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "product_types",
        label: "Product Types",
        type: "multi_select",
        operators: ["in", "nin"],
        choices: "",
      },
      {
        key: "aggregation",
        label: "Aggregation",
        type: "select",
        choices: ["sum", "average", "max", "min"],
        is_required: true,
      },
      {
        key: "field_name",
        label: "Field Name",
        type: "select",
        choices: [
          "outstanding_amount",
          "overdue_amount",
          "sanctioned_amount",
          "loan_count",
        ],
        is_required: true,
      },
    ],
  },
  {
    key: "{applicant_type}.bureau-enquiries", //applicant_type can be business or applicant
    label: "Enquiries",
    type: "number",
    operators: ["=", ">", ">=", "<", "<="],
    filters: [
      {
        key: "period",
        label: "in last",
        type: "period",
        operators: ["=", ">", ">=", "<", "<=", "!="],
        period_types: ["months", "years"],
      },
      {
        key: "report_date",
        label: "Report Date",
        type: "select",
        choices: ["reported_date", "current_date"],
      },
      {
        key: "product_types",
        label: "Product Types",
        type: "multi_select",
        operators: ["in", "nin"],
        choices: "",
      },
    ],
  },
  {
    key: "{applicant_type}.bureau-dpds", //applicant_type can be business or applicant
    label: "DPDs",
    type: "number",
    operators: ["=", ">", ">=", "<", "<="],
    filters: [
      {
        key: "period",
        label: "Period",
        type: "period",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "account_date",
        label: "Account Date",
        type: "select",
        choices: ["date_open", "date_close"],
      },
      {
        key: "report_date",
        label: "Report Date",
        type: "select",
        choices: ["reported_date", "current_date"],
      },
      {
        key: "vintage",
        label: "with vintage",
        type: "vintage",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "product_types",
        label: "Product Types",
        type: "multi_select",
        operators: ["in", "nin"],
        choices: "",
      },
      {
        key: "sanctioned_amount",
        label: "Sanctioned Amount",
        type: "number",
        operators: ["=", ">", ">=", "<", "<=", "!="],
        value_suffix: "",
      },
      {
        key: "aggregation",
        label: "Aggregation",
        type: "select",
        choices: ["max", "min"],
        is_required: true,
      },
    ],
  },
  {
    key: "{applicant_type}.banking-credits", //applicant_type can be business or applicant
    label: "Bank Credits",
    type: "number",
    operators: [">", ">=", "<", "<="],
    filters: [
      {
        key: "period",
        label: "in last",
        type: "period",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "aggregation",
        label: "Aggregation",
        type: "select",
        choices: ["sum", "average", "max", "min"],
      },
    ],
  },
  {
    key: "{applicant_type}.banking-debits",
    label: "Bank Debits",
    type: "number",
    operators: [">", ">=", "<", "<="],
    filters: [
      {
        key: "period",
        label: "in last",
        type: "period",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "aggregation",
        label: "Aggregation",
        type: "select",
        choices: ["sum", "average", "max", "min"],
      },
    ],
  },
  {
    key: "{applicant_type}.banking-bounces",
    label: "Bank Bounces",
    type: "number",
    operators: [">", ">=", "<", "<="],
    filters: [
      {
        key: "period",
        label: "in last",
        type: "period",
        operators: [">", ">=", "<", "<="],
        period_types: ["months", "years"],
      },
      {
        key: "mode_type",
        label: "Mode Type",
        type: "multi_select",
        operators: ["in", "nin"],
        choices: ["cheque", "ach"],
      },
    ],
  },
];

const RuleComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const getOperatorInput = () => {
    return (
      <div style={{ marginLeft: "5px" }}>
        <select name="operators">
          {selectedOption?.operators?.map((_item, index) => {
            return <option key={index}>{_item}</option>;
          })}
        </select>
      </div>
    );
  };

  const getInputTypeField = () => {
    return (
      <div style={{ marginLeft: "5px" }}>
        {selectedOption?.type === "multi_select" ? (
          <select name="inputField">
            {selectedOption?.options.map((_item, index) => {
              return <option key={index}>{_item}</option>;
            })}
          </select>
        ) : (
          <input type="number" />
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const selectType = e.target.value;
    const options = selectJSON.find((_item) =>
      _item?.label?.toLowerCase().includes(selectType.toLowerCase())
    );
    if (options) setSelectedOption(options);
  };

  return (
    <div style={{ display: "flex" }}>
      <select onChange={handleChange} name="selection" id="new">
        <option>Gender</option>
        <option>Age</option>
        <option>Current Address Ownership</option>
        <option>Business Type</option>
        <option>Business Vintage</option>
        <option>Business Vintage with Partner</option>

        <option>Brand</option>
        <option>Business Authenticity Check</option>
        <option>Business Person Check</option>
        <option>Person Authenticity Check</option>
        <option>Bank Check</option>
        <option>Score</option>

        <option>Accounts</option>
        <option>Enquiries</option>
        <option>DPD</option>
        <option>Credits</option>

        <option>Debits</option>
        <option>Bounces</option>
        <option>ABB</option>
      </select>

      {getOperatorInput()}
      {getInputTypeField()}
    </div>
  );
};

const QueryForm = () => {
  const [rules, setRules] = useState([]);
  const [res, setRes] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const responseObject = {
      rules: [],
    };
    const arr = Array.from(data.entries());
    responseObject[arr[0][0]] = arr[0][1];
    for (let i = 1; i < arr.length; i += 3) {
      let ruleObject = {};
      let j = i;
      while (j < i + 3) {
        ruleObject[arr[j][0]] = arr[j][1];
        j++;
      }

      responseObject.rules.push(ruleObject);
    }

    console.log(responseObject);
    setRes(responseObject);
  };

  const createRule = () => {
    setRules((prev) => [...prev, <RuleComponent />]);
  };

  const createGroup = () => {};

  console.log({ rules });

  return (
    <div id="rootDiv">
      <form onSubmit={handleSubmit}>
        <select name="combinator" id="new">
          <option>AND</option>
          <option>OR</option>
        </select>

        <button
          onClick={createRule}
          type="button"
          style={{ marginLeft: "10px" }}
        >
          +Rule
        </button>
        <button type="button" style={{ marginLeft: "10px" }}>
          +Group
        </button>
        <button type="submit">submit</button>

        {rules.map((rule, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              {rule}{" "}
              <button
                onClick={() => {
                  console.log(
                    [...rules.slice(0, index), ...rules.slice(index + 1)],
                    index
                  );

                  setRules([
                    ...rules.slice(0, index),
                    ...rules.slice(index + 1),
                  ]);
                }}
                style={{ marginLeft: "5px" }}
                type="button"
              >
                x
              </button>
            </div>
          );
        })}
      </form>
      <QueryResult res={res} />
    </div>
  );
};

const QueryResult = (res: any) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "grey",
        width: "100%",
        height: "40%",
        overflow: "scroll",
      }}
    >
      {JSON.stringify(res)}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <QueryForm />
    </div>
  );
}
