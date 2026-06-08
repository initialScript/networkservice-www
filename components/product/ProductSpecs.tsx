export interface ProductSpec {
  key: string;
  value: string;
}

interface Props {
  specs: ProductSpec[];
}

export default function ProductSpecs({ specs }: Props) {
  if (!specs || specs.length === 0) return null;

  // Group by "GroupName: SpecName" pattern
  const groups = new Map<string, ProductSpec[]>();
  for (const spec of specs) {
    const colonIdx = spec.key.indexOf(':');
    const group = colonIdx > -1 ? spec.key.slice(0, colonIdx).trim() : '_';
    const displayKey = colonIdx > -1 ? spec.key.slice(colonIdx + 1).trim() : spec.key;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push({ key: displayKey, value: spec.value });
  }

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Caractéristiques techniques</h2>
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        {Array.from(groups.entries()).map(([group, items], gi) => (
          <div key={group}>
            {group !== '_' && (
              <div className="px-4 py-2.5 bg-gray-100 text-sm font-semibold text-gray-700 border-b border-gray-200">
                {group}
              </div>
            )}
            <table className="w-full">
              <tbody>
                {items.map((spec, i) => (
                  <tr
                    key={spec.key}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-2.5 text-sm font-medium text-gray-600 w-2/5 border-b border-gray-100">
                      {spec.key}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-800 border-b border-gray-100">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {gi < groups.size - 1 && <div className="border-b border-gray-200" />}
          </div>
        ))}
      </div>
    </section>
  );
}
