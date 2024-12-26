import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CustomerDetailsGrid = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // Düzenlenecek ürünün ID'sini URL'den al
    const { customers } = useSelector((state) => state.customers);

    const selectedCustomer = customers.find((customer) => customer.id === id);

    const formattedCreatedAtDate = new Date(selectedCustomer.createdAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedCreatedAtTime = new Date(selectedCustomer.createdAt).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedUpdateDate = new Date(selectedCustomer.lastUpdated).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedUpdateTime = new Date(selectedCustomer.lastUpdated).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (selectedCustomer) {
            setCustomer({
                name: selectedCustomer.name || '',
                email: selectedCustomer.email || '',
                phone: selectedCustomer.phone || '',
                address: selectedCustomer.address || '',
                createdAt: formattedCreatedAtDate + " " + formattedCreatedAtTime || '',
                lastUpdated: formattedUpdateDate + " " + formattedUpdateTime || '',
            });
        }
    }, [selectedCustomer, formattedCreatedAtDate, formattedCreatedAtTime, formattedUpdateDate, formattedUpdateTime]);

    const handleDelete = async () => {
        if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
            //await dispatch(deleteCustomer(id));
            navigate('/customers');
        }
    }

    return (
        <div>
            <h2>Customers List</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name} - {customer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDetailsGrid;

