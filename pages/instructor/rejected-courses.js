import { message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import InstructorRoute from "../../components/routes/InstructorRoute";
import CourseCard from '../../components/cards/CourseCard';
import { Spin } from "antd";
import styles from '../../styles/components/instructor/RejectedCourses.module.scss';

const RejectedCoursesPage = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  // functions
  const getPublicCourses = async () => {
    try {
      setLoading(true);
      const queryString = new URLSearchParams({
        status: 'rejected'
      }).toString();

      const { data } = await axios.get(
        `/api/course/ins?${queryString}`
      );

      setCourses(data.data);
      setLoading(false);
    }
    catch (error) {
      message.error(`Xảy ra lỗi khi lấy danh sách khóa học đã được xuất bản. Chi tiết: ${error.message}`);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPublicCourses();
  }, []);

  return (
    <InstructorRoute hideSidebar={false}>
      <div
        className={styles.container}
      >
        <h1
          className={styles.h1}
        >Các khóa học bị từ chối xuất bản</h1>
        {
          loading
            ? (
              <div style={{ textAlign: 'center', marginTop: '32px', width: '100%' }}>
                <Spin spinning={true} size='large' />
              </div>
            )
            : (
              <div
                className={styles.container_wrapper}
                style={{ width: '1408px' }}
              >
                <div
                  className={styles.container_wrapper_courses}
                >
                  {
                    !courses?.length
                      ? (
                        <p
                          style={{ fontSize: '16px' }}
                        ><i>Không có dữ liệu</i></p>
                      )
                      : (
                        courses.map(course => {
                          return (
                            (
                              <Link
                                key={course._id}
                                href={`/instructor/course/view/${course.slug}`}
                              >
                                <CourseCard
                                  course={course}
                                  disable={true}
                                />
                              </Link>
                            )
                          );
                        })
                      )
                  }
                </div>
              </div>
            )
        }
      </div>
    </InstructorRoute>
  )
}

export default RejectedCoursesPage;