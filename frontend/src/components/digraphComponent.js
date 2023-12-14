import React, { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import { useParams } from 'react-router-dom';

const renderForeignObjectNode = ({
  nodeDatum,
  foreignObjectProps
}) => (
  <foreignObject {...foreignObjectProps}>
    <div style={{ border: '1px solid black', backgroundColor: '#dedede', padding: '10px' }}>
      <h3 style={{ textAlign: 'center', margin: '0' }}>{nodeDatum.name}</h3>
      <p style={{ textAlign: 'center', marginTop: '5px' }}>
        Type: {nodeDatum.attributes.type}<br />
        {nodeDatum.attributes.hasMerged ? `Has Merged: Yes` : ''}
        {nodeDatum.attributes.parentCompany ? `Parent Company: ${nodeDatum.attributes.parentCompany}` : ''}
      </p>
    </div>
  </foreignObject>
);

const EmployeeTree = () => {
  const [treeData, setTreeData] = useState();
  const { employeeID } = useParams();
  const [mergeSplitData, setMergeSplitData] = useState([]);

  useEffect(() => {
    const fetchMergeSplitData = async () => {
      try {
        // Fetch merge/split data only if it hasn't been fetched yet
        if (mergeSplitData.length === 0) {
          const response = await fetch('http://localhost:9000/getdata/companies/split');
          const data = await response.json();
          console.log('MergeSplitData:', data);
          if (data.success) {
            setMergeSplitData(data.data);
          } else {
            console.error('Error fetching merge/split data:', data.message);
          }
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
  
    const fetchData = async () => {
      try {
        // Fetch data only if employeeID has changed
        if (employeeID) {
          const response = await fetch(`http://localhost:9000/getdata/${employeeID}`);
          const companyData = await response.json();
          console.log('CompanyData:', companyData);
  
          if (response.ok && companyData.success) {
            let rootNode;
  
            if (companyData.data.hasMerged) {
              const mergeRecord = mergeSplitData.find(record => record.wholeCompany === companyData.data.companyName);
              console.log('MergeRecord:', mergeRecord);
  
              if (mergeRecord) {
                rootNode = {
                  name: `${mergeRecord.partCompany1} + ${mergeRecord.partCompany2}`,
                  attributes: { type: 'MergedCompanies' },
                  children: [
                    {
                      name: mergeRecord.wholeCompany,
                      attributes: { type: 'WholeCompany' },
                      children: companyData.data.childrenCompanies.map(child => ({
                        name: child,
                        attributes: { type: 'ChildCompany' },
                      })),
                    },
                  ],
                };
              }
            } else {
              rootNode = {
                name: companyData.data.companyName,
                attributes: {
                  type: 'Company',
                  hasMerged: 'No',
                  parentCompany: companyData.data.parentCompany || 'None',
                },
                children: companyData.data.childrenCompanies.map(child => ({
                  name: child,
                  attributes: { type: 'ChildCompany' },
                })),
              };
            }
  
            console.log('RootNode:', rootNode);
            setTreeData(rootNode);
          } else {
            console.error('Error fetching company data:', companyData.message);
          }
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
  
    fetchMergeSplitData();
    fetchData();
  }, [employeeID, mergeSplitData]);

  

  
  const config = {
    translate: { x: window.innerWidth / 2, y: window.innerHeight / 4 },
    orientation: 'vertical',
    scaleExtent: { min: 0.1, max: 1 },
    nodeSize: { x: 300, y: 300 },
    separation: {
      siblings: 2,
      nonSiblings: 2
    }
  };

  const handleNodeClick = (nodeData, event) => {
    console.log('Clicked Node:', nodeData);
    event.stopPropagation();
  };

  return (
    <div id="treeWrapper" style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {treeData && (
        <Tree
          data={treeData}
          zoomable={true}
          translate={config.translate}
          orientation={config.orientation}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps: {
                width: 300,
                height: 150,
                x: -150,
                y: -75
              }
            })
          }
          onClickNode={handleNodeClick}
          separation={config.separation}
          nodeSize={config.nodeSize}
        />
      )}
    </div>
  );
};

export default EmployeeTree;