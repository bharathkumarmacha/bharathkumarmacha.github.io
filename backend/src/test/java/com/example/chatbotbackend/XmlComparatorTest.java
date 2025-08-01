package com.example.chatbotbackend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class XmlComparatorTest {

    @Test
    public void testCompareXml() {
        XmlComparator comparator = new XmlComparator();
        
        String controlXml = "<struct>"
                + "<Option>31</Option>"
                + "<int>4235</int>"
                + "<Option>C</Option>"
                + "<boolean>false</boolean></struct>";
        String testXml = "<struct>"
                + "<boolean>false</boolean>"
                + "<Option>4235</Option>"
                + "<Option>31</Option>"
                + "<Option>C</Option></struct>";
        
        assertTrue(comparator.compareXml(controlXml, testXml));
    }
}
