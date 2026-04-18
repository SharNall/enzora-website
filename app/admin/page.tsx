"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getAllOrders, updateOrderStatus, deleteOrder, OrderData } from "@/lib/firebase/orders";
import {
  getAllInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryStats,
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  InventoryItem,
  Transaction,
} from "@/lib/firebase/inventory";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "inventory" | "accounting">("orders");
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [invStats, setInvStats] = useState({ totalItems: 0, totalValue: 0, totalCost: 0, profit: 0, lowStockCount: 0, itemCount: 0 });
  const [orderFilter, setOrderFilter] = useState<"all" | "pending" | "confirmed" | "rejected">("all");

  // Forms
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [newInventory, setNewInventory] = useState({ name: "", sku: "", quantity: 0, price: 0, cost: 0, category: "Devices", description: "" });
  const [newTransaction, setNewTransaction] = useState({ type: "sale" as const, amount: 0, description: "", category: "Sales", reference: "" });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const [ordersData, inventoryData, transactionsData, statsData] = await Promise.all([
      getAllOrders(),
      getAllInventoryItems(),
      getAllTransactions(),
      getInventoryStats(),
    ]);
    
    setOrders(ordersData as any);
    setInventory(inventoryData);
    setTransactions(transactionsData.sort((a, b) => ((b.date as any)?.toDate?.() || b.date) - ((a.date as any)?.toDate?.() || a.date)));
    setInvStats(statsData);
    setLoading(false);
  };

  // Order Management
  const handleStatusChange = async (orderId: string, newStatus: "pending" | "confirmed" | "rejected") => {
    await updateOrderStatus(orderId, newStatus);
    loadAllData();
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Delete this order?")) {
      await deleteOrder(orderId);
      loadAllData();
    }
  };

  // Inventory Management
  const handleAddInventory = async () => {
    if (newInventory.name && newInventory.sku && newInventory.quantity >= 0) {
      await addInventoryItem(newInventory);
      setNewInventory({ name: "", sku: "", quantity: 0, price: 0, cost: 0, category: "Devices", description: "" });
      setShowAddInventory(false);
      loadAllData();
    }
  };

  const handleUpdateInventory = async (itemId: string, updates: Partial<InventoryItem>) => {
    await updateInventoryItem(itemId, updates);
    loadAllData();
  };

  const handleDeleteInventory = async (itemId: string) => {
    if (confirm("Delete this item?")) {
      await deleteInventoryItem(itemId);
      loadAllData();
    }
  };

  // Transaction Management
  const handleAddTransaction = async () => {
    if (newTransaction.amount && newTransaction.description) {
      await addTransaction({ ...newTransaction, date: new Date() });
      setNewTransaction({ type: "sale", amount: 0, description: "", category: "Sales", reference: "" });
      setShowAddTransaction(false);
      loadAllData();
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (confirm("Delete this transaction?")) {
      await deleteTransaction(transactionId);
      loadAllData();
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredOrders = orderFilter === "all" ? orders : orders.filter((o) => o.status === orderFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f8ff] to-[#eef3ff] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-up">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600">Welcome, {user.email} • Manage orders, inventory, and finances</p>
          </div>
          <button
            onClick={handleLogout}
            className="h-11 rounded-xl border border-[#dbe5ff] bg-white px-5 text-sm font-semibold text-[#6E75BF] transition hover:border-[#6E75BF] hover:bg-[#f5f8ff]"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm border border-[#dbe5ff] animate-fade-up-delayed">
          {(["orders", "inventory", "accounting"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="animate-fade-up">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-[#dbe5ff] p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-slate-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-[#6E75BF]">{orders.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-yellow-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-yellow-700 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{orders.filter((o) => o.status === "pending").length}</p>
              </div>
              <div className="bg-white rounded-xl border border-green-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-green-700 mb-1">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">{orders.filter((o) => o.status === "confirmed").length}</p>
              </div>
              <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-red-700 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{orders.filter((o) => o.status === "rejected").length}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["all", "pending", "confirmed", "rejected"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    orderFilter === f
                      ? "bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] text-white"
                      : "bg-white text-slate-700 border border-[#dbe5ff] hover:bg-slate-50"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-[#dbe5ff] shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-slate-600">Loading...</div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-600">No orders found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#f5f8ff] to-[#eef3ff] border-b border-[#dbe5ff]">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Name</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Email</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Phone</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Company</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Status</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Date</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-[#dbe5ff] hover:bg-[#f5f8ff] transition">
                          <td className="px-6 py-4 text-slate-900 font-medium">{order.name}</td>
                          <td className="px-6 py-4 text-slate-600">{order.email}</td>
                          <td className="px-6 py-4 text-slate-600">{order.phone}</td>
                          <td className="px-6 py-4 text-slate-600">{order.company || "—"}</td>
                          <td className="px-6 py-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id!, e.target.value as any)}
                              className={`px-3 py-1.5 rounded-lg font-medium text-sm border-0 cursor-pointer ${
                                order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-xs">
                            {order.createdAt instanceof Date
                              ? order.createdAt.toLocaleDateString()
                              : order.createdAt?.toDate?.().toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteOrder(order.id!)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === "inventory" && (
          <div className="animate-fade-up">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-[#dbe5ff] p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-slate-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-[#6E75BF]">{invStats.totalItems}</p>
              </div>
              <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-blue-700 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-blue-600">${invStats.totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-purple-700 mb-1">Total Cost</p>
                <p className="text-3xl font-bold text-purple-600">${invStats.totalCost.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-xl border border-green-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-green-700 mb-1">Profit Margin</p>
                <p className="text-3xl font-bold text-green-600">${invStats.profit.toFixed(2)}</p>
              </div>
            </div>

            {/* Add Item Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowAddInventory(!showAddInventory)}
                className="px-6 py-3 bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                {showAddInventory ? "Cancel" : "+ Add Item"}
              </button>
            </div>

            {/* Add Item Form */}
            {showAddInventory && (
              <div className="bg-white rounded-xl border border-[#dbe5ff] p-6 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Item</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={newInventory.name}
                    onChange={(e) => setNewInventory({ ...newInventory, name: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <input
                    type="text"
                    placeholder="SKU"
                    value={newInventory.sku}
                    onChange={(e) => setNewInventory({ ...newInventory, sku: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newInventory.quantity}
                    onChange={(e) => setNewInventory({ ...newInventory, quantity: parseInt(e.target.value) || 0 })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={newInventory.price}
                    onChange={(e) => setNewInventory({ ...newInventory, price: parseFloat(e.target.value) || 0 })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Cost"
                    value={newInventory.cost}
                    onChange={(e) => setNewInventory({ ...newInventory, cost: parseFloat(e.target.value) || 0 })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <select
                    value={newInventory.category}
                    onChange={(e) => setNewInventory({ ...newInventory, category: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  >
                    <option>Devices</option>
                    <option>Accessories</option>
                    <option>Software</option>
                    <option>Services</option>
                  </select>
                </div>
                <textarea
                  placeholder="Description"
                  value={newInventory.description}
                  onChange={(e) => setNewInventory({ ...newInventory, description: e.target.value })}
                  className="w-full px-4 py-2 mt-4 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  rows={2}
                />
                <button
                  onClick={handleAddInventory}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Save Item
                </button>
              </div>
            )}

            {/* Inventory Table */}
            <div className="bg-white rounded-xl border border-[#dbe5ff] shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-slate-600">Loading...</div>
              ) : inventory.length === 0 ? (
                <div className="p-8 text-center text-slate-600">No items in inventory</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#f5f8ff] to-[#eef3ff] border-b border-[#dbe5ff]">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Name</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">SKU</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Qty</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Price</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Cost</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Total Value</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Category</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className={`border-b border-[#dbe5ff] hover:bg-[#f5f8ff] transition ${item.quantity < 10 ? "bg-red-50" : ""}`}>
                          <td className="px-6 py-4 text-slate-900 font-medium">{item.name}</td>
                          <td className="px-6 py-4 text-slate-600">{item.sku}</td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateInventory(item.id!, { quantity: parseInt(e.target.value) || 0 })}
                              className="w-16 px-2 py-1 rounded border border-[#dbe5ff] text-center"
                            />
                            {item.quantity < 10 && <span className="text-red-600 text-xs ml-2">Low!</span>}
                          </td>
                          <td className="px-6 py-4 text-slate-600">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-slate-600">${item.cost.toFixed(2)}</td>
                          <td className="px-6 py-4 font-semibold text-green-600">${(item.quantity * item.price).toFixed(2)}</td>
                          <td className="px-6 py-4 text-slate-600">{item.category}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteInventory(item.id!)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACCOUNTING TAB */}
        {activeTab === "accounting" && (
          <div className="animate-fade-up">
            {/* Add Transaction Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowAddTransaction(!showAddTransaction)}
                className="px-6 py-3 bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                {showAddTransaction ? "Cancel" : "+ Add Transaction"}
              </button>
            </div>

            {/* Add Transaction Form */}
            {showAddTransaction && (
              <div className="bg-white rounded-xl border border-[#dbe5ff] p-6 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Record Transaction</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as any })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  >
                    <option value="sale">Sale</option>
                    <option value="purchase">Purchase</option>
                    <option value="adjustment">Adjustment</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || 0 })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  />
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-[#dbe5ff] focus:outline-none focus:ring-2 focus:ring-[#6E75BF]"
                  >
                    <option>Sales</option>
                    <option>Purchases</option>
                    <option>Operating Expenses</option>
                    <option>Returns</option>
                  </select>
                </div>
                <button
                  onClick={handleAddTransaction}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Record Transaction
                </button>
              </div>
            )}

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-[#dbe5ff] shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-slate-600">Loading...</div>
              ) : transactions.length === 0 ? (
                <div className="p-8 text-center text-slate-600">No transactions recorded</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#f5f8ff] to-[#eef3ff] border-b border-[#dbe5ff]">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Date</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Type</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Description</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Category</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Amount</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((trans) => (
                        <tr key={trans.id} className="border-b border-[#dbe5ff] hover:bg-[#f5f8ff] transition">
                          <td className="px-6 py-4 text-slate-600 text-xs">
                            {trans.date instanceof Date ? trans.date.toLocaleDateString() : trans.date?.toDate?.().toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                trans.type === "sale"
                                  ? "bg-green-100 text-green-700"
                                  : trans.type === "purchase"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {trans.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-900 font-medium">{trans.description}</td>
                          <td className="px-6 py-4 text-slate-600">{trans.category}</td>
                          <td className={`px-6 py-4 font-semibold ${trans.type === "sale" ? "text-green-600" : "text-red-600"}`}>
                            {trans.type === "sale" ? "+" : "-"}${trans.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteTransaction(trans.id!)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadAllData}
            className="px-6 py-3 bg-gradient-to-r from-[#6E75BF] to-[#6E75BF] text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Refresh All Data
          </button>
        </div>
      </div>
    </div>
  );
}
