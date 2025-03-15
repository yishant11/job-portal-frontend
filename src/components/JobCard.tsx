import { Typography, Chip, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function JobCard({ job, isSelected, onClick }) {
  return (
    <div
      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
        isSelected
          ? "bg-slate-50 dark:bg-slate-800/60 border-l-4 border-blue-500 dark:border-blue-600"
          : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={job.logo || "/placeholder.svg"}
          alt={`${job.Company} logo`}
          variant="rounded"
          className="h-10 w-10 bg-slate-100 dark:bg-slate-700 flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <Typography
            variant="subtitle1"
            className="font-medium text-slate-900 dark:text-slate-100 mb-1 truncate"
          >
            {job.title}
          </Typography>
          <Typography
            variant="body2"
            className="text-slate-500 dark:text-slate-400 mb-2"
          >
            {job.Company}
          </Typography>

          <div className="flex flex-wrap gap-2 mb-2">
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <LocationOnIcon className="mr-1" fontSize="small" />
              {job.location}
            </div>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <AccessTimeIcon className="mr-1" fontSize="small" />
              {job.posted}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              />
            ))}
            {job.tags.length > 3 && (
              <Chip
                label={`+${job.tags.length - 3}`}
                size="small"
                variant="outlined"
                className="text-xs"
              />
            )}
          </div>
        </div>

        <Typography
          variant="body2"
          className="font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap"
        >
          {job.salary}
        </Typography>
      </div>
    </div>
  );
}
