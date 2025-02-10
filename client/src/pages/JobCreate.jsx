import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BasicDetails from "./Job/BasicDetails";
import JobDescription from "./Job/JobDescription";
import Diversity from "./Job/Diversity";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const JobCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <>
            <div className="contact-us-container">
                <div className="form-section">
                    <div className="form-content">
                        <div>
                            <h1>Post Job</h1>
                            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                                <TabList>
                                    <Tab>Basic Details</Tab>
                                    <Tab>Job Description</Tab>
                                    {/* <Tab>Diversity</Tab> */}
                                </TabList>
                                <TabPanel>
                                    <BasicDetails setTabIndex={setTabIndex} />
                                </TabPanel>
                                <TabPanel>
                                    <JobDescription setTabIndex={setTabIndex} />
                                </TabPanel>
                                {/* <TabPanel>
                                    <Diversity setTabIndex={setTabIndex} />
                                </TabPanel> */}
                            </Tabs>
                        </div>
                    </div></div>
            </div>

        </>
    )
}

export default JobCreate