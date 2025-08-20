import React, { FC, useState, useEffect } from "react";
import { Invoice, ProductLine } from "../../../data/invoice/types";
import { Text as PdfText } from "@react-pdf/renderer";
import { EditableInput } from "./EditableInput";
import Document from "./Document";
import Page from "./Page";
import View from "./View";
import Text from "./Text";
import handleChange from "./InvoicePage";

interface Props {
  gstTableData?: number[];
  sameState?: boolean;
  pdfMode?: boolean;
  onChange?: (invoice: Invoice) => void;
}

const GstTable: FC<Props> = ({
  gstTableData,
  sameState,
  pdfMode,
  onChange,
}) => {
  return (
    <View className="table w-90 mt-20" pdfMode={pdfMode}>
      <View className="flex tableRow" pdfMode={pdfMode}>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}></Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            CGST
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            SGST
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            IGST
          </Text>
        </View>
      </View>

      <View className="flex tableRow" pdfMode={pdfMode}>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            5%
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[5] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[5] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {!sameState ? (gstTableData?.[5] ?? 0).toString() : "0"}
          </Text>
        </View>
      </View>
      <View className="flex tableRow" pdfMode={pdfMode}>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            12%
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[12] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[12] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {!sameState ? (gstTableData?.[12] ?? 0).toString() : "0"}
          </Text>
        </View>
      </View>
      <View className="flex tableRow" pdfMode={pdfMode}>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            18%
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[18] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[18] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {!sameState ? (gstTableData?.[18] ?? 0).toString() : "0"}
          </Text>
        </View>
      </View>
      <View className="flex tableRow" pdfMode={pdfMode}>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            24%
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[24] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {sameState ? ((gstTableData?.[24] ?? 0) / 2).toString() : "0"}
          </Text>
        </View>
        <View className="tableCol" pdfMode={pdfMode}>
          <Text className="tableCell" pdfMode={pdfMode}>
            {!sameState ? (gstTableData?.[24] ?? 0).toString() : "0"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GstTable;
