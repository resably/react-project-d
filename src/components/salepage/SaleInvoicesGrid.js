import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../../redux/salesSlice';

const SaleInvoicesGrid = () => {
    const dispatch = useDispatch();
    const { sales, status, error } = useSelector((state) => state.sales);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSales());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <p>Yükleniyor...</p>;
    }

    if (status === 'failed') {
        return <p>Hata: {error}</p>;
    }

    return (
        <div className="p-6">
            <table className="table-auto w-full mt-4 bg-gray-800 rounded">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Ticari Ünvanı</th>
                        <th className="px-4 py-2">Yetkili</th>
                        <th className="px-4 py-2">Ödeme Türü</th>
                        <th className="px-4 py-2">Genel Toplam</th>
                        <th className="px-4 py-2">Tarih</th>
                        <th className="px-4 py-2">Son Düzenleme</th>
                        <th className="px-4 py-2">Tür</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody className="table-auto w-full mt-4 bg-gray-800">
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td className="border border-gray-700 px-4 py-2">{sale.barcode} PERAKENDE</td>
                            <td className="border border-gray-700 px-4 py-2">{sale.name}PERAKENDE</td>
                            <td className="border border-gray-700 px-4 py-2">{sale.brand}Nakit , Kredi Kartı</td>
                            <td className="border border-gray-700 px-4 py-2">{sale.category}1905 TL</td>
                            <td className="border border-gray-700 px-4 py-2">{sale.stock} 25.12.2024 14.40</td>
                            <td className="border border-gray-700 px-4 py-2">{sale.purchasePrice} 25.12.2024 14.40</td>
                            <td className="border border-gray-700 px-4 py-2">{sale.price} SATIŞ</td>
                            <td className="border border-gray-700 px-4 py-2">
                                <div className="flex justify-center gap-3">
                                    {/* Sil Butonu */}
                                    <button
                                        className="text-white hover:bg-red-400 bg-red-500 px-2 py-1 rounded font-light text-base w-20"
                                    >
                                        Sil
                                    </button>

                                    {/* Düzenle Butonu */}
                                    <button
                                        className="text-white hover:bg-orange-400 bg-orange-500 px-2 py-1 rounded font-light text-base w-20"
                                    >
                                        Düzenle
                                    </button>

                                    {/* Detaylar Butonu */}
                                    <button
                                        className="text-white hover:bg-green-400 bg-green-500 px-2 py-1 rounded font-light text-base w-20"
                                    // Detaylar butonu için gerekli handle eklenebilir
                                    >
                                        Detaylar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SaleInvoicesGrid;