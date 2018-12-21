import React from "react";
import ExportPdfButton from "./ExportPdfButton";
import { shallow } from "enzyme";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

it("Renders PDF button", () => {
  const transaction = {
    id: 1,
    name: "mock name",
    type: "Invoice",
    type_short: "I"
  };

  const mock = jest.fn();
  const wrapper = shallow(
    <ExportPdfButton transaction={transaction} onClick={mock} />
  );

  let button = (
    <Button variant="contained" color="default" onClick={mock} size="small">
      <span id={1} name="hello">
        <div name="hello" />
        PDF
      </span>
    </Button>
  );
  button = withStyles(button);

  expect(wrapper.containsMatchingElement(button)).toEqual(true);
  expect(wrapper.containsMatchingElement("PDF")).toEqual(true);
});
