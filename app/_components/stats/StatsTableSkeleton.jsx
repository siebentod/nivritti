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

function StatsTableSkeleton() {
  return (
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
            <div className="skeleton h-[15px] w-3 inline-block bg-zinc-700 rounded-sm align-text-top mt-[1px]"></div>
          </TableCell>
          <TableCell className="py-[1px] px-1 text-center">
            <div className="skeleton h-[15px] w-3 inline-block bg-zinc-700 rounded-sm align-text-top mt-[1px]"></div>
          </TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="py-[1px] px-1">Week</TableCell>
          <TableCell className="py-[1px] px-1 text-center">
            <div className="skeleton h-[15px] w-3 inline-block bg-zinc-700 rounded-sm align-text-top mt-[1px]"></div>
          </TableCell>
          <TableCell className="py-[1px] px-1 text-center">
            <div className="skeleton h-[15px] w-3 inline-block bg-zinc-700 rounded-sm align-text-top mt-[1px]"></div>
          </TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="py-[1px] px-1">Total</TableCell>
          <TableCell className="py-[1px] px-1 text-center">
            <div className="skeleton h-[15px] w-3 inline-block bg-zinc-700 rounded-sm align-text-top mt-[1px]"></div>
          </TableCell>
          <TableCell className="py-[1px] px-1 text-center">
            <div className="skeleton h-[15px] w-3 inline-block bg-zinc-700 rounded-sm align-text-top mt-[1px]"></div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default StatsTableSkeleton;
