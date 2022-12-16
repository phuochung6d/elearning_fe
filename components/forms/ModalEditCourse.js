import { Button, Input, Modal, Space, InputNumber, Select, Form, Switch, message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/components/forms/ModalEditCourse.module.scss';
import InputList from '../inputs/inputlist/InputList';

const ModalAddLesson = ({
  course,
  setCourse,
  modalEditCourse,
  setModalEditCourse,
}) => {
  // states
  const [courseBeingEdited, setCourseBeingEdited] = useState({
    name: '',
    category: '',
    summary: '',
    tags: [],
    paid: '',
    price: '',
    goal: [],
    requirements: [],
    languages: [],
    published: false,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);

  // functions
  const inputChangeHandler = (e) => {
    setCourseBeingEdited({ ...courseBeingEdited, [e.target.name]: e.target.value });
  }

  const editCourseHandler = async () => {
    console.log(courseBeingEdited);
    try {
      const { data } = await axios.put(`/api/course/ins/${course._id}`, courseBeingEdited);
      setCourse(data.data);
      message.success(`Cập nhật khóa học ${data.data.name} thành công`);
      setModalEditCourse({ ...modalEditCourse, opened: false, which: '' })
    }
    catch (error) {
      message.error(`Xảy ra lỗi cập nhật khóa học, vui lòng thử lại\nChi tiết: ${error.message}`)
    }
  }

  const fetchCourseData = async () => {
    setCourseBeingEdited({
      name: course?.name,
      category: course?.category,
      tags: course?.tags,
      paid: course?.paid,
      price: course?.price,
      description: course?.description,
      published: course?.published,
      summary: course?.summary,
      requirements: course?.requirements,
      goal: course?.goal,
      languages: course?.languages,
    });
    const { data } = await axios.get(
      `/api/category/ins`
    );
    setCategoryOptions(data.data);
  }

  useEffect(() => {
    fetchCourseData();
  }, [modalEditCourse.opened]);

  return (
    <Modal
      className={styles.container}
      width={896}
      title={<b>Chỉnh sửa</b>}
      open={modalEditCourse.opened}
      centered={true}
      maskClosable={false}
      onCancel={() => setModalEditCourse({ ...modalEditCourse, opened: false })}
      footer={(
        <Button
          type='primary'
          onClick={editCourseHandler}
        >
          Hoàn tất
        </Button>
      )}
    >
      <Form
        className={styles.form}
        layout='vertical'
        initialValues={course}
      >
        {/* area which: general */}
        {
          modalEditCourse?.which === 'general' && (
            <div>
              <Form.Item label='Tên khóa học' className={styles.form_item}>
                <Input
                  name='name'
                  allowClear={true}
                  value={courseBeingEdited.name}
                  onChange={(e) => inputChangeHandler(e)}
                />
              </Form.Item>
              <Form.Item label='Phân loại của khóa học' className={styles.form_item}>
                {/* <Input
                  name='category'
                  allowClear={true}
                  value={courseBeingEdited.name}
                  onChange={(e) => inputChangeHandler(e)}
                /> */}
                <Select
                  value={courseBeingEdited.category}
                  options={categoryOptions?.map(cate => {
                    return {
                      value: cate._id,
                      label: cate.name
                    }
                  })}
                  onChange={(value) => setCourseBeingEdited({...courseBeingEdited, category: value})}
                />
              </Form.Item>
              <Form.Item label='Tag' className={styles.form_item}>
                <InputList
                  maxLength={5}
                  value='tags'
                  type='textbox'
                  formValues={courseBeingEdited}
                  setFormValues={setCourseBeingEdited}
                />
              </Form.Item>
              <Form.Item label='Yêu cầu kiến thức' className={styles.form_item}>
                <InputList
                  type='textbox'
                  value='requirements'
                  maxLength={5}
                  formValues={courseBeingEdited}
                  setFormValues={setCourseBeingEdited}
                />
              </Form.Item>
              <Form.Item
                label='Học viên đạt được sau khóa học'
                className={styles.form_item}
                style={{ overflow: 'scroll', paddingBottom: '12px' }}
              >
                <InputList
                  type='textbox'
                  value='goal'
                  maxLength={5}
                  formValues={courseBeingEdited}
                  setFormValues={setCourseBeingEdited}
                />
              </Form.Item>
              <Form.Item label='Ngôn ngữ' className={styles.form_item}>
                <InputList
                  type='textbox'
                  value='languages'
                  maxLength={2}
                  formValues={courseBeingEdited}
                  setFormValues={setCourseBeingEdited}
                />
              </Form.Item>
              <div
                className={styles.d_flex_row}
                style={{ width: '100%' }}
              >
                <Form.Item label='Loại khóa học' name='paid' className={styles.form_item} style={{ width: '40%' }}>
                  <Select
                    value={courseBeingEdited.paid}
                    onChange={(value) =>
                      setCourseBeingEdited({
                        ...courseBeingEdited,
                        paid: value,
                        price: !value ? 0 : course.price
                      })
                    }
                  >
                    <Select.Option value={true}>Có phí</Select.Option>
                    <Select.Option value={false}>Miễn phí</Select.Option>
                  </Select>
                </Form.Item>
                {courseBeingEdited.paid && (
                  <Form.Item label='Giá' name='price' className={styles.form_item} style={{ width: '15%' }}>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={courseBeingEdited.price}
                      min={0}
                      max={99.99}
                      onChange={(value) => setCourseBeingEdited({ ...courseBeingEdited, price: value })}
                    />
                  </Form.Item>
                )}
              </div>

              {/* <Form.Item label='Xuất bản khóa học này ?' className={styles.form_item}>
                {
                  course.lessons.length < 5
                    ? <p><i>(Khóa học này chưa đủ điều điện để xuất bản)</i></p>
                    : <Switch
                      checked={courseBeingEdited.published}
                      onChange={(value) => setCourseBeingEdited({ ...courseBeingEdited, published: value })}
                    />
                }
              </Form.Item> */}
            </div>
          )
        }

        {/* area which: description */}
        {
          modalEditCourse?.which === 'description' && (
            <div>
              <Form.Item label='Mô tả khóa học' className={styles.form_item}>
                <Input.TextArea
                  name='description'
                  allowClear={true}
                  value={courseBeingEdited.description}
                  style={{ height: '600px' }}
                  onChange={(e) => inputChangeHandler(e)}
                />
              </Form.Item>
            </div>
          )
        }

        {/* area which: summary */}
        {
          modalEditCourse?.which === 'summary' && (
            <div>
              <Form.Item label='Tóm tắt' className={styles.form_item}>
                <Input.TextArea
                  name='summary'
                  showCount={true}
                  maxLength={200}
                  allowClear={true}
                  value={courseBeingEdited.summary}
                  onChange={(e) => inputChangeHandler(e)}
                />
              </Form.Item>
            </div>
          )
        }
      </Form>
    </Modal>
  )
}

export default React.memo(ModalAddLesson);