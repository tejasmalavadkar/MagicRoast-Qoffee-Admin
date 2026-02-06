import { memo } from 'react';

const SkeletonRow = memo(() => (
  <tr className="border-b border-gray-100">
    <td className="py-3 px-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    </td>
    <td className="py-3 px-4">
      <div className="space-y-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
      </div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
    </td>
    <td className="py-3 px-4">
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </td>
  </tr>
));

SkeletonRow.displayName = 'SkeletonRow';

const EmployeeTableSkeleton = memo(({ rowCount = 5 }) => (
  <tbody>
    {Array.from({ length: rowCount }).map((_, index) => (
      <SkeletonRow key={index} />
    ))}
  </tbody>
));

EmployeeTableSkeleton.displayName = 'EmployeeTableSkeleton';

export default EmployeeTableSkeleton;