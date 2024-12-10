import React, { useState, useRef, useEffect } from "react";


function SaleGrid() {
  const products = [
    { id: 1, barcode: "123456", name: "Telefon", price: 7000, stock: 15 },
    { id: 2, barcode: "234567", name: "Bilgisayar", price: 20000, stock: 10 },
    { id: 3, barcode: "345678", name: "Kulaklık", price: 1000, stock: 50 },
    { id: 60, barcode: "456789", name: "Ekmek Kızartma Makinesi", price: 800, stock: 12 },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectedProductsRef = useRef();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);
    if (exists) return;
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    setSearchQuery("");
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, quantity) }
          : product
      )
    );
  };

  useEffect(() => {
    const total = selectedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
    setInvoiceProducts(selectedProducts);
  }, [selectedProducts]);

  const handleSave = () => {
    console.log("Kaydet işlevi devre dışı.");
  };

  const handleNewSale = () => {
    setInvoiceProducts([]);
    setTotalPrice(0);
    setSelectedProducts([]);
    setSearchQuery("");
  };

  const handleCancel = () => {
    setSelectedProducts([]);
    setSearchQuery("");
  };

  return (
    <div className="sale-grid flex flex-row gap-16 p-8 max-w-screen-xl mx-auto justify-between items-start h-screen">
      <div className="product-search-section flex-1 border border-gray-600 rounded-lg p-8 flex flex-col text-white">
        <h2 className="text-2xl font-semibold mb-4">SEÇİLEN ÜRÜNLER</h2>
        <div className="selected-products-list overflow-y-auto max-h-[350px] border border-gray-600 p-5 rounded-lg bg-gray-900">
          {selectedProducts.length > 0 ? (
            <table className="w-full table-auto mt-5 bg-gray-900 rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Barkod</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Ürün Adı</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Fiyat</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Adet</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Sil</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">{product.barcode}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.price} TL</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product.id, parseInt(e.target.value))
                        }
                        className="w-20 p-2 bg-gray-800 text-white rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Henüz ürün seçilmedi.</p>
          )}
        </div>
        <div className="product-search-bar mt-6">
          <input
            type="text"
            placeholder="Ürün Ara"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800 text-white mb-6"
          />
          <div className={`product-list ${searchQuery ? "block" : "hidden"} max-h-[250px] overflow-y-auto`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-row flex justify-between p-3 bg-gray-900 border border-gray-600 rounded-md mb-2 hover:bg-gray-700">
                <span>{product.barcode}</span>
                <span>{product.name}</span>
                <span>{product.price} TL</span>
                <button
                  onClick={() => handleAddProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                >
                  Ekle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="invoice-section flex-1 border border-gray-600 rounded-lg p-8 flex flex-col text-white min-w-[48%]">
        <h2 className="text-4xl text-center mb-5">FATURA</h2>
        <div className="invoice-products-list overflow-y-auto max-h-[350px] border border-gray-600 p-5 rounded-lg bg-gray-900">
          {invoiceProducts.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Ürün Adı</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Fiyat</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Adet</th>
                </tr>
              </thead>
              <tbody>
                {invoiceProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.price} TL</td>
                    <td className="px-6 py-4">{product.quantity} adet</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Fatura oluşturulmadı.</p>
          )}
        </div>
        <div className="totals mt-8 text-center text-2xl font-bold">
          <p>Toplam Fiyat: {totalPrice.toFixed(2)} TL</p>
        </div>
        <div className="actions flex justify-between gap-5 mt-8">
          <button
            disabled
            onClick={handleSave}
            className="flex-1 p-4 bg-green-500 text-white rounded-lg hover:bg-green-400 cursor-not-allowed"
          >
            KAYDET
          </button>
          <button
            onClick={handleNewSale}
            className="flex-1 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
          >
            YENİ SATIŞ
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 p-4 bg-red-500 text-white rounded-lg hover:bg-red-400"
          >
            İPTAL
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleGrid;
