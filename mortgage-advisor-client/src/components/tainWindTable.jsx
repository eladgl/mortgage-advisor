import React from "react";

const TailWindTable = () => {
    return (
        <div className="flex items-top justify-center">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th className="py-3 px-4 text-center"></th>
                            <th className="py-3 px-4 text-center">אופצייה א'</th>
                            <th className="py-3 px-4 text-center">אופצייה ב'</th>
                            <th className="py-3 px-4 text-center" style={{color: 'green'}}>אופצייה ג'</th>
                            <th className="py-3 px-4 text-center">אופצייה ד'</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-200 border-b border-blue-gray-200">
                            <td className="py-3 px-4 font-medium"></td>
                            <td className="py-3 px-4 text-center">בנק הפועלים</td>
                            <td className="py-3 px-4 text-center">בנק מזרחי</td>
                            <td className="py-3 px-4 text-center">בנק לאומי</td>
                            <td className="py-3 px-4 text-center">בנק אגוד</td>
                        </tr>
                        <tr className="bg-white border-b border-blue-gray-200">
                            <td className="py-3 px-4 font-medium">עמלת פקיד</td>
                            <td className="py-3 px-4 text-center">1.2%</td>
                            <td className="py-3 px-4 text-center">5.6%</td>
                            <td className="py-3 px-4 text-center">1%</td>
                            <td className="py-3 px-4 text-center">7%</td>
                        </tr>
                        <tr className="bg-gray-200 border-b border-blue-gray-200">
                            <td className="py-3 px-4 font-medium">עמלת פעולה</td>
                            <td className="py-3 px-4 text-center">0%</td>
                            <td className="py-3 px-4 text-center">84 ש"ח לשנה</td>
                            <td className="py-3 px-4 text-center">0%</td>
                            <td className="py-3 px-4 text-center">0.24% בשנה</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TailWindTable;
