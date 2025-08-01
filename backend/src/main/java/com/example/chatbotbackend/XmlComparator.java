package com.example.chatbotbackend;

import org.xmlunit.builder.DiffBuilder;
import org.xmlunit.diff.Diff;
import org.xmlunit.diff.ElementSelectors;
import org.xmlunit.diff.DefaultNodeMatcher;
import org.xmlunit.util.Nodes;

import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class XmlComparator {

    public boolean compareXml(String controlXml, String testXml) {
        Diff diff = DiffBuilder.compare(controlXml)
                .withTest(testXml)
                .withNodeFilter(node -> node.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE)
                .withAttributeFilter(attr -> !attr.getNodeName().equals("ignoreThisAttribute"))
                .withNodeMatcher(new DefaultNodeMatcher(
                        ElementSelectors.conditionalBuilder()
                                .whenElementIsNamed("Option").thenUse(ElementSelectors.byNameAndTextRec)
                                .elseUse(ElementSelectors.byNameAndAllAttributes)
                                .build()))
                .checkForSimilar()
                .build();

        return !diff.hasDifferences();
    }

    private String sortAttributes(String xml) {
        return StreamSupport.stream(Nodes.xmlToDocument(xml).getDocumentElement().getAttributes().spliterator(), false)
                .sorted(Comparator.comparing(attr -> attr.getNodeName()))
                .map(attr -> attr.getNodeName() + "=\"" + attr.getNodeValue() + "\"")
                .collect(Collectors.joining(" ", "<element ", " />"));
    }
}
