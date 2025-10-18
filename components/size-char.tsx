"use client"

export default function SizeChart() {
  const chartData = [
    { size: "S", breast: "36", waist: "30", length: "26" },
    { size: "M", breast: "38", waist: "32", length: "27" },
    { size: "L", breast: "40", waist: "34", length: "28" },
    { size: "XL", breast: "42", waist: "36", length: "29" },
    { size: "XXL", breast: "44", waist: "38", length: "30" },
  ]

  return (
    <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
        Size Chart
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border-collapse border border-gray-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Size</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Breast (in)</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Waist (in)</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Length (in)</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row) => (
              <tr key={row.size} className="hover:bg-pink-50 transition">
                <td className="border border-gray-200 px-3 py-2 font-medium">{row.size}</td>
                <td className="border border-gray-200 px-3 py-2">{row.breast}</td>
                <td className="border border-gray-200 px-3 py-2">{row.waist}</td>
                <td className="border border-gray-200 px-3 py-2">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        *Measurements may vary slightly by design or fabric type.
      </p>
    </div>
  )
}
