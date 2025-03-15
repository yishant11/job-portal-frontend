"use client";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckIcon from "@mui/icons-material/Check";

export default function JobDetail({ job, onBack }) {
  return (
    <Card className="rounded-xl shadow-sm overflow-hidden">
      {/* Mobile back button */}
      <IconButton className="md:hidden m-2" onClick={onBack} size="small">
        <ChevronLeftIcon />
      </IconButton>

      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <Avatar
            src={job.logo || "/placeholder.svg"}
            alt={`${job.company} logo`}
            variant="rounded"
            className="h-14 w-14 bg-slate-100 dark:bg-slate-700 flex-shrink-0"
          />

          <div className="flex-1">
            <Typography
              variant="h4"
              className="font-bold text-slate-900 dark:text-slate-100 mb-1"
            >
              {job.title}
            </Typography>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <BusinessIcon className="mr-1" fontSize="small" />
                {job.company}
              </div>
              <div className="flex items-center">
                <LocationOnIcon className="mr-1" fontSize="small" />
                {job.location}
              </div>
              <div className="flex items-center">
                <WorkIcon className="mr-1" fontSize="small" />
                {job.type}
              </div>
              <div className="flex items-center">
                <AccessTimeIcon className="mr-1" fontSize="small" />
                {job.posted}
              </div>
            </div>
          </div>

          <Button
            variant="contained"
            className="md:self-start"
            endIcon={<OpenInNewIcon />}
          >
            Apply Now
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div>
          <Typography variant="h6" className="mb-3">
            Job Description
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            {job.description}
          </Typography>
        </div>

        <Divider />

        <div>
          <Typography variant="h6" className="mb-3">
            Responsibilities
          </Typography>
          <ul className="space-y-2">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                <Typography
                  variant="body1"
                  className="text-slate-600 dark:text-slate-300"
                >
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        <div>
          <Typography variant="h6" className="mb-3">
            Requirements
          </Typography>
          <ul className="space-y-2">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                <Typography
                  variant="body1"
                  className="text-slate-600 dark:text-slate-300"
                >
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        <div>
          <Typography variant="h6" className="mb-3">
            Benefits
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-slate-50 dark:bg-slate-800/50 border-none"
              >
                <CardContent className="p-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Typography
                    variant="body1"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    {benefit}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 text-center">
          <Typography variant="h6" className="mb-2">
            Interested in this position?
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-600 dark:text-slate-400 mb-4"
          >
            Apply now and join our amazing team at {job.company}
          </Typography>
          <Button variant="contained" size="large" endIcon={<OpenInNewIcon />}>
            Apply for this position
          </Button>
        </Card>
      </div>
    </Card>
  );
}
