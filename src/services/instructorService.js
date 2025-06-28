import axios from '@/lib/axios';

// Get instructor dashboard data
export const fetchInstructorDashboard = async (id) => {
    const res = await axios.get(`/instructor/dashboard?instructorId=${id}`);
    return res.data;
};

// Get students enrolled in instructor's courses
export const fetchInstructorStudents = async (id) => {
    const res = await axios.get('/instructor/students?instructorId=' + id);
    return res.data;
};

// Approve an instructor (admin only)
export const approveInstructor = async (userId) => {
    const res = await axios.put(`/instructor/approve`, { "userId": userId });
    return res.data;
};

// Get courses by instructor (public)
export const fetchInstructorCourses = async (id) => {
    const res = await axios.get(`/instructor/${id}/courses`);
    return res.data;
};

// Become an instructor
export const becomeInstructor = async (data) => {
    const res = await axios.post('/instructor/become-instructor', data);
    return res.data.data;
};

// Get pending instructors (admin only)
export const fetchPendingInstructors = async () => {
    const res = await axios.get('/instructor/pending');
    return res.data.data;
};

// Get approved instructors
export const fetchApprovedInstructors = async () => {
    const res = await axios.get('/instructor/approved');
    return res.data.data;
};

// Get all instructors
export const fetchAllInstructors = async () => {
    const res = await axios.get('/instructor/all');
    return res.data.data;
};
export const deleteInstructor = async (id) => {
    const res = await axios.delete(`/user/${id}`);
    return res.data.data;
}
export const updateInstructor = async (id, data) => {
    console.log("data ==", data);
    const res = await axios.put(`instructor/${id}`, data);
    console.log("res", res.data);
    return res.data;
}
