// EmployeeTree.js
import React, { useState, useEffect } from "react";
import { Tree } from "react-d3-tree";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom

const EmployeeTree = () => {
  const [treeData, setTreeData] = useState();
  const { employeeID } = useParams(); // Get employeeID from URL parameter

  useEffect(() => {
    // Fetch the employee data from your endpoint using the employeeID
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/getdata/${employeeID}`);
        const data = await response.json();
        console.log(data); // Log what we're getting from the endpoint

        if (response.ok) {
          // Transform the data into the tree structure
          const transformedData = {
            name: data.companyName,
            children: [
              {
                name: data.jobTitle,
                children: [
                  { name: `${data.firstName} ${data.lastName}` },
                ],
              },
            ],
          };
          setTreeData(transformedData);
        } else {
          console.error('Error fetching employee data:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    if (employeeID) {
      fetchData();
    }
  }, [employeeID]); // Effect runs when employeeID changes

  // Define custom node shape (box)
  const svgBox = {
    shape: "rect",
    shapeProps: {
      width: 120,   // Adjust width if needed
      height: 40,   // Height of the box
      x: -60,       // Center the box horizontally
      y: -20,       // Center the box vertically
    },
  };

  // Define onClick handler for nodes
  const onClick = (nodeData, evt) => {
    console.log("Clicked node:", nodeData.name);
  };

  // Tree configuration
  const config = {
    nodeSvgShape: svgBox,
    onClick,
    translate: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    orientation: "vertical",
  };

  // Render only if treeData is set
  return (
    <div id="treeWrapper" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {treeData && (
        <Tree
          data={treeData}
          zoomable={true}
          translate={config.translate}
          orientation={config.orientation}
          nodeSvgShape={config.nodeSvgShape}
          onClick={config.onClick}
        />
      )}
    </div>
  );
};

export default EmployeeTree;
