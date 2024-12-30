import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc, getDoc } from "firebase/firestore";

// Add Group
export const addGroup = createAsyncThunk(
    "groups/addGroup",
    async (group, { rejectWithValue }) => {
        try {
            const groupRef = doc(db, "groups", group.name);
            const groupSnap = await getDoc(groupRef);

            if (groupSnap.exists()) {
                return rejectWithValue("Bu grup zaten mevcut.");
            }

            await setDoc(groupRef, {
                name: group.name,
                description: group.description,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
            });

            return { id: group.name, ...group };
        } catch (error) {
            return rejectWithValue("Grup ekleme sırasında bir hata oluştu.");
        }
    }
);

// Fetch Groups
export const fetchGroups = createAsyncThunk(
    "groups/fetchGroups",
    async (_, { rejectWithValue }) => {
        try {
            const groupsCollection = collection(db, "groups");
            const groupsSnapshot = await getDocs(groupsCollection);

            const groups = groupsSnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            return groups;
        } catch (error) {
            return rejectWithValue("Gruplar getirilirken bir hata oluştu.");
        }
    }
);

// Delete Group
export const deleteGroup = createAsyncThunk(
    "groups/deleteGroup",
    async (groupId, { rejectWithValue }) => {
        try {
            const groupRef = doc(db, "groups", groupId);
            await deleteDoc(groupRef);

            return groupId;
        } catch (error) {
            return rejectWithValue("Grup silinirken bir hata oluştu.");
        }
    }
);

// Update Group
export const updateGroup = createAsyncThunk(
    "groups/updateGroup",
    async ({ id, updatedGroup }, { rejectWithValue }) => {
        try {
            const groupRef = doc(db, "groups", id);
            await updateDoc(groupRef, updatedGroup);

            return { id, ...updatedGroup };
        } catch (error) {
            return rejectWithValue("Grup güncellenirken bir hata oluştu.");
        }
    }
);

const initialState = {
    groups: [],
    status: "idle",
    error: null,
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addGroup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addGroup.fulfilled, (state, action) => {
                state.groups.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(addGroup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchGroups.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteGroup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.groups = state.groups.filter((group) => group.id !== action.payload);
                state.status = "succeeded";
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateGroup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                const updatedIndex = state.groups.findIndex((group) => group.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.groups[updatedIndex] = action.payload;
                }
                state.status = "succeeded";
            })
            .addCase(updateGroup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export default groupsSlice.reducer;



