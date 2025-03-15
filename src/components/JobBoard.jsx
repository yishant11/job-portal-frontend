import { useState, useEffect } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  Tabs,
  Tab,
  Skeleton,
  Card,
  CardContent,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import JobCard from "./JobCard";
import JobDetail from "./JobDetail";

// Mock data - replace with your actual data source

const locations = [
  "All Locations",
  "San Francisco, CA",
  "New York, NY",
  "Remote",
  "Austin, TX",
  "Seattle, WA",
];
const experienceLevels = [
  "All Experience",
  "Entry Level",
  "1-2 years",
  "3-5 years",
  "5-7 years",
  "7+ years",
];
const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export default function JobBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [experience, setExperience] = useState("All Experience");
  const [jobType, setJobType] = useState("All Types");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState("list");
  const [drawerOpen, setDrawerOpen] = useState(false);

 
 
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/getAlljob"
      );
      setFilteredJobs(response.data.JobDetails);
      // console.log(filteredJobs);
    };
    getData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    handleSearch();
  }, [searchTerm, location, experience, jobType]);

  const handleSearch = async () => {
    const Getdetails = {
      title: searchTerm, // search input value
      location: location, // selected location
      experience: experience, // selected experience
    };

    console.log("Get Details :", Getdetails);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/getjob",
        Getdetails,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("API response:", response.data);
      setFilteredJobs(response.data.JobDetails);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setMobileView("detail");
  };

  const handleTabChange = (event, newValue) => {
    setMobileView(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("All Locations");
    setExperience("All Experience");
    setJobType("All Types");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Find Your Dream Job
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies around the
          world
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            fullWidth
            placeholder="Search jobs, skills, or companies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              className: "rounded-xl",
            }}
            className="flex-grow"
          />

          <div className="hidden md:flex gap-2">
            <FormControl className="min-w-[180px]">
              <InputLabel id="location-drawer-label">Location</InputLabel>
              <Select
                labelId="location-drawer-label"
                value={location}
                // Remove inline handleSearch() call:
                onChange={(e) => setLocation(e.target.value)}
                startAdornment={
                  <LocationOnIcon className="mr-2 text-slate-400" />
                }
                className="rounded-xl"
                label="Location"
              >
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="min-w-[180px]">
              <InputLabel id="experience-label">Experience</InputLabel>
              <Select
                labelId="experience-label"
                value={experience}
                // Remove inline handleSearch() call:
                onChange={(e) => setExperience(e.target.value)}
                startAdornment={<WorkIcon className="mr-2 text-slate-400" />}
                className="rounded-xl"
                label="Experience"
              >
                {experienceLevels.map((exp) => (
                  <MenuItem key={exp} value={exp}>
                    {exp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="min-w-[180px]">
              <InputLabel id="job-type-label">Job Type</InputLabel>
              <Select
                labelId="job-type-label"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="rounded-xl"
                label="Job Type"
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="outlined"
            className="md:hidden rounded-xl"
            onClick={toggleDrawer(true)}
            startIcon={<FilterListIcon />}
          >
            Filters
          </Button>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box sx={{ width: 300 }} p={3}>
              <Typography variant="h6" mb={2}>
                Filters
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Narrow down your job search with specific filters
              </Typography>

              <div className="space-y-4 flex flex-col gap-4">
                <FormControl fullWidth>
                  <InputLabel id="location-drawer-label">Location</InputLabel>
                  <Select
                    labelId="location-drawer-label"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    label="Location"
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc} value={loc}>
                        {loc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="experience-drawer-label">
                    Experience
                  </InputLabel>
                  <Select
                    labelId="experience-drawer-label"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    label="Experience"
                  >
                    {experienceLevels.map((exp) => (
                      <MenuItem key={exp} value={exp}>
                        {exp}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="job-type-drawer-label">Job Type</InputLabel>
                  <Select
                    labelId="job-type-drawer-label"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    label="Job Type"
                  >
                    {jobTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={toggleDrawer(false)}
                  className="mt-4"
                >
                  Apply Filters
                </Button>
              </div>
            </Box>
          </Drawer>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden mb-4">
        <Tabs
          value={mobileView}
          onChange={handleTabChange}
          variant="fullWidth"
          className="bg-white dark:bg-slate-800 rounded-lg shadow-sm"
        >
          <Tab value="list" label="Job Listings" />
          <Tab value="detail" label="Job Details" disabled={!selectedJob} />
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Listings */}
        <div
          className={`lg:col-span-1 ${
            mobileView === "detail" ? "hidden md:block" : ""
          }`}
        >
          <Card className="rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <Typography variant="subtitle1" fontWeight="medium">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
              </Typography>
              <FormControl size="small" className="w-[130px]">
                <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                  labelId="sort-label"
                  defaultValue="newest"
                  label="Sort by"
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="relevant">Most Relevant</MenuItem>
                  <MenuItem value="salary-high">Highest Salary</MenuItem>
                  <MenuItem value="salary-low">Lowest Salary</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[calc(100vh-300px)] overflow-y-auto">
              {loading ? (
                // Loading skeletons
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="p-4">
                      <Skeleton variant="text" width="75%" height={24} />
                      <Skeleton variant="text" width="50%" height={20} />
                      <div className="flex gap-2 mt-3">
                        <Skeleton variant="rounded" width={60} height={24} />
                        <Skeleton variant="rounded" width={60} height={24} />
                      </div>
                    </div>
                  ))
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSelected={selectedJob?.id === job._id}
                    onClick={() => handleJobSelect(job)}
                  />
                ))
              ) : (
                <div className="p-8 text-center">
                  <SearchIcon className="w-12 h-12 mx-auto mb-2 opacity-20 text-slate-400" />
                  <Typography variant="body1" className="mb-2 text-slate-400">
                    No jobs match your search criteria
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-slate-500 dark:text-slate-400"
                  >
                    Try adjusting your filters or search terms
                  </Typography>
                  <Button
                    variant="outlined"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Job Details */}
        <div
          className={`lg:col-span-2 ${
            mobileView === "list" ? "hidden md:block" : ""
          }`}
        >
          {selectedJob ? (
            <JobDetail job={selectedJob} onBack={() => setMobileView("list")} />
          ) : (
            <Card className="h-full flex items-center justify-center p-8 text-center rounded-xl">
              <CardContent>
                <WorkIcon className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                <Typography variant="h5" className="mb-2">
                  No job selected
                </Typography>
                <Typography
                  variant="body1"
                  className="text-slate-500 dark:text-slate-400 mb-6 max-w-md"
                >
                  Select a job from the list to view its details and apply
                </Typography>
                <div className="hidden md:block">
                  <ChevronLeftIcon className="w-6 h-6 mx-auto animate-pulse text-slate-400" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
