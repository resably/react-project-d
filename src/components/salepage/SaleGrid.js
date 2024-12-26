import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveSale, updateProductStocks } from "../../redux/salesSlice";
import { fetchCustomers } from "../../redux/CustomerSlice";
import { use } from "react";

function SaleGrid() {

  const dispatch = useDispatch();

  const { items: products, status, error } = useSelector((state) => state.products);
  const { customers } = useSelector((state) => state.customers);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);



  const selectedProductsRef = useRef();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
  );

  const handleAddProduct = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);
    if (exists) {
      // Eğer ürün zaten var ise, adedini artır
      setSelectedProducts(selectedProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      // Eğer ürün yoksa, yeni ürün ekle
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    setSearchQuery("");  // Arama çubuğunu temizle
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

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSave = () => {
    if (!selectedCustomer) {
      alert("Lütfen bir müşteri seçin!");
      return;
    }  
    const saleData = {
      products: invoiceProducts.map((product) => ({
        name: product.name,
        barcode: product.barcode,
        price: product.price,
        quantity: product.quantity,
        total: product.price * product.quantity,
      })),
      totalPrice,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      saleDate: new Date(),
      lastUpdated: new Date(),
    };

    // Önce satışı kaydet
    dispatch(saveSale(saleData))
      .unwrap()
      .then(() => {
        // Ardından stokları güncelle
        return dispatch(updateProductStocks(saleData.products)).unwrap();
      })
      .then(() => {
        alert('Satış ve stok güncellemesi başarılı!');
        setSelectedProducts([]);
        setInvoiceProducts([]);
        setTotalPrice(0);
      })
      .catch((err) => {
        console.error('Hata:', err);
        alert(`İşlem başarısız: ${err}`);
      });
  };

  const handleSelectCustomer = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customer);
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

  const VAT_RATE = 0.2; // KDV 

  return (
    <div className="sale-grid grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 w-full h-screen overflow-auto">
      {/* Customer Selection Section */}
      <div className="customer-selection-section col-span-1 border border-gray-600 rounded-lg p-4 flex flex-col text-white">
        <h2 className="text-xl font-semibold mb-4">MÜŞTERİ SEÇİMİ</h2>
        <select
          value={selectedCustomer?.id || ""}
          onChange={(e) => handleSelectCustomer(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white mb-4"
        >
          <option value="" disabled>
            Müşteri Seçiniz
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {selectedCustomer && (
          <div className="selected-customer mt-4 p-3 bg-gray-900 rounded-lg border border-gray-600">
            <p className="text-lg font-semibold">Seçilen Müşteri:</p>
            <p className="text-base font-light">Adı: {selectedCustomer.name}</p>
            <p className="text-base font-light">Yetkili: {selectedCustomer.manager}</p>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
            >
              Kaldır
            </button>
          </div>
        )}
      </div>

      {/* Product Search Section */}
      <div className="product-search-section col-span-2 border border-gray-600 rounded-lg p-4 flex flex-col text-white">
        <h2 className="text-2xl font-semibold mb-4">SEÇİLEN ÜRÜNLER</h2>
        <div className="selected-products-list overflow-y-auto max-h-72 border border-gray-600 p-3 rounded-lg bg-gray-900">
          {selectedProducts.length > 0 ? (
            <table className="w-full table-auto mt-5 bg-gray-900 rounded-lg">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-white font-semibold">Barkod</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">Ürün Adı</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">Fiyat</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">Adet</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">Sil</th>
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
            placeholder="Ürün Ara veya Barkod Gir"
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


      {/* Invoice Section */}
      <div className="invoice-section col-span-1 border border-gray-600 rounded-lg p-4 flex flex-col text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">FATURA</h2>
        <div className="invoice-products-list overflow-y-auto max-h-72 border border-gray-600 p-3 rounded-lg bg-gray-900">
          {invoiceProducts.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-white font-semibold">Ürün Adı</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">Fiyat</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">KDV</th>
                  <th className="px-3 py-2 text-left text-white font-semibold">Adet</th>
                </tr>
              </thead>
              <tbody>
                {invoiceProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-3 py-2">{product.name}</td>
                    <td className="px-3 py-2">{product.price * product.quantity} TL</td>
                    <td className="px-3 py-2">
                      {(product.price * product.quantity * VAT_RATE).toFixed(2)} TL
                    </td>
                    <td className="px-3 py-2">{product.quantity} adet</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Fatura oluşturulmadı.</p>
          )}
        </div>
        <div className="totals mt-4 text-center text-lg font-semibold">
          <div className="flex justify-between items-center bg-gray-800 text-white p-3 rounded-lg">
            <span>KDV (%20):</span>
            <span>{(totalPrice * VAT_RATE).toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 text-white p-3 rounded-lg mt-3">
            <span>Toplam Fiyat:</span>
            <span>{totalPrice.toFixed(2)} TL</span>
          </div>
        </div>
        <div className="actions flex justify-between gap-5 mt-8">
          <button
            onClick={handleSave}
            className="flex-1 p-4 bg-green-500 text-white rounded-lg hover:bg-green-400"
          >
            KAYDET
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 p-4 bg-red-500 text-white rounded-lg hover:bg-red-400"
          >
            İPTAL
          </button>
          <button
            onClick={handleNewSale}
            className="flex-1 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
          >
            YENİ SATIŞ
          </button>
        </div>
      </div>
    </div >

  );
}

export default SaleGrid;
