import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function StatsTable({ counter, user_id }) {
  return (
    <div className="relative">
      <Table className="w-fit min-w-0 [&_tr:hover]:bg-transparent">
        <TableHeader className="border-b-0">
          <TableRow className="border-b-0">
            <TableCell className="py-0.5 px-1 font-normal w-12"></TableCell>
            <TableCell className="p-0 font-normal text-center w-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-0.5">
                      <CheckCircleIcon className="h-3.5 w-3.5 inline-block" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    times
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="p-0 font-normal text-center w-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-0.5">
                      <ClockIcon className="h-3.5 w-3.5 inline-block" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    minutes
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-0">
            <TableCell className="py-[1px] px-1">Today</TableCell>
            <TableCell className="py-[1px] px-1 text-center">
              <span>
                {Math.round(counter.countToday * 10) / 10}
              </span>
            </TableCell>
            <TableCell className="py-[1px] px-1 text-center">
              <span>
                {Math.round(counter.minutesToday * 10) / 10}
              </span>
            </TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="py-[1px] px-1">Week</TableCell>
            <TableCell className="py-[1px] px-1 text-center">
              <span>
                {Math.round(counter.countWeek * 10) / 10}
              </span>
            </TableCell>
            <TableCell className="py-[1px] px-1 text-center">
              <span>
                {Math.round(counter.minutesWeek * 10) / 10}
              </span>
            </TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="py-[1px] px-1">Total</TableCell>
            <TableCell className="py-[1px] px-1 text-center">
              <span>
                {Math.round(counter.countAll * 10) / 10}
              </span>
            </TableCell>
            <TableCell className="py-[1px] px-1 text-center">
              <span>
                {Math.round(counter.minutesAll * 10) / 10}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {!user_id && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help absolute -right-4 bottom-0">
                <span className="icon-[noto--cookie]"></span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs max-w-[150px] whitespace-normal">
              Stats are stored in cookies. You can sign in to store them on the server and get additional statistics.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default StatsTable;
