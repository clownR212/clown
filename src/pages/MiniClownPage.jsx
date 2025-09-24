export default function MiniClownPage({ data }) {
//   const rows = [...data.teams].sort((a, b) => {
//     if (b.records.wins !== a.records.wins) return b.records.wins - a.records.wins;
//     return a.records.losses - b.records.losses;
//   });

  return (
    <></>
    // <div className="space-y-10 max-w-none">
    //   <h2 className="text-xl font-semibold">MiniClown - Classement</h2>
    //   <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
    //     <table className="w-full border-collapse text-sm md:text-base">
    //       <thead className="bg-gray-50 border-b text-gray-600">
    //         <tr className="[&>th]:text-left [&>th]:p-4">
    //           <th>#</th>
    //           <th>Équipe</th>
    //           <th>Résultats</th>
    //           <th>OP.GG</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {rows.map((t, i) => (
    //           <tr key={t.id} className="odd:bg-gray-50/50">
    //             <td className="p-4">{i + 1}</td>
    //             <td className="p-4">{t.name}</td>
    //             <td className="p-4 font-semibold">
    //               {t.records.wins}-{t.records.losses}
    //             </td>
    //             <td className="p-4">
    //               <a href={t.opgg} target="_blank" className="text-yellow-700 hover:underline">
    //                 op.gg
    //               </a>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //   {/* Liste des équipes */}
    //   <section className="space-y-4">
    //     <h2 className="text-xl font-semibold">Équipes</h2>
    //     <div className="grid md:grid-cols-2 gap-6">
    //       {rows.map((t) => (
    //         <div key={t.id} className="rounded-2xl border bg-white shadow-sm p-5">
    //           <div className="flex justify-between items-start">
    //             <div>
    //               <div className="text-lg font-semibold">{t.name}</div>
    //               <a className="text-yellow-700 text-sm hover:underline" href={t.opgg} target="_blank">
    //                 op.gg global
    //               </a>
    //             </div>
    //             <div className="text-right">
    //               <div className="text-xs text-gray-500">Résultats</div>
    //               <div className="text-xl font-bold">{t.records.wins}-{t.records.losses}</div>
    //             </div>
    //           </div>

    //           <div className="mt-4 pt-4 border-t space-y-1.5">
    //             {(t.players ?? []).map((p) => (
    //               <div key={p.nick} className="flex justify-between text-sm leading-6">
    //                 <div>
    //                   <span className="font-medium">{p.nick}</span>
    //                   <span className="text-gray-500"> ({p.role})</span>
    //                   {p.captain && (
    //                     <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs">
    //                       Capitaine
    //                     </span>
    //                   )}
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </section>
    // </div>
  );
}
