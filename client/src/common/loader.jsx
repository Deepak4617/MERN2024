import { RotatingLines } from 'react-loader-spinner';
import React from "react";
import styled from 'styled-components';

export const Loader = () => {

  return (
    <RotatingLines
      strokeColor="white"
      strokeWidth="5"
      animationDuration="1.75"
      width="20"
      visible={true}
    />
  )
}

export const UserLoader = ({ rows = 6 }) => {
  return (
    <div className="relative">
      {/* Blur Overlay */}
      <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-sm flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>

      {/* Fake Table */}
      <table className="w-full text-sm blur-sm">
        <thead className="bg-purple-300">
          <tr>
            {["Name", "E-Mail", "Phone", "Edit", "Delete"].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-4 w-20 bg-slate-400 rounded" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b">
              <td className="px-6 py-4">
                <div className="h-4 w-24 bg-slate-400 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-40 bg-slate-400 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-28 bg-slate-400 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-12 bg-slate-400 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-12 bg-slate-400 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
