import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCourses, setVisibleFalse, getUniversities } from '../../redux/actions/courses';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import AppListItem from '../../components/listItem';

export default function CourseScreen({ navigation }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search
                    searchOpen={searchOpen}
                    color={theme.colors.blue}
                    onPress={() => { setSearchOpen(!searchOpen); fitlerCourses('', selectedUni); }}
                    onChangeText={text => fitlerCourses(text, selectedUni)}
                    search={search}
                />
            )
        })
    })

    //Constants
    const token = useSelector(state => state.authReducer.token);
    const visible = useSelector(state => state.courseReducer.snackBarVisible);
    const message = useSelector(state => state.courseReducer.snackBarMessage);
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [coursesFiltered, setCoursesFiltered] = useState([]);
    const [selectedUni, setSelectedUni] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const courses = useSelector(state => state.courseReducer.courses);
    const courseLoaded = useSelector(state => state.courseReducer.courseLoaded);
    const dispatch = useDispatch();
    const fetchCourses = (token) => dispatch(getCourses(token));
    const fetchUni = (token) => dispatch(getUniversities(token));
    const removeSnackBar = () => dispatch(setVisibleFalse());
    const universities = useSelector(state => state.courseReducer.universities);

    useEffect(() => {
        fetchCourses(token);
        setCoursesFiltered(courses);
        fetchUni(token);
    }, [!courseLoaded])

    const fitlerCourses = (title, uni) => {
        setSearch(title);
        let temp = JSON.parse(JSON.stringify(courses));
        temp = temp.filter((item) => item.name.toLowerCase().includes(title.toLowerCase()) || item.teacher.toLowerCase().includes(title.toLowerCase()));
        temp = temp.filter((item) => item.university.toLowerCase().includes(uni.toLowerCase()));
        setCoursesFiltered(temp);
    }

    const showCourses = () => {
        return coursesFiltered.map((course, index) => {
            return (
                <AppListItem
                    key={index}
                    onPressAction={() => { navigation.navigate('ChatRoom', course) }}
                    onLongPressAction={() => { navigation.navigate('ModifyCourse', course) }}
                    color={theme.colors.lightBlue}
                    title={course.name}
                    subtitle={course.university}
                    secondsubtitle={course.teacher}
                />
            )

        })
    }


    if (courseLoaded) {
        return (
            <View style={styles.container}>
                {!showFilter &&
                    <Button
                        raised={true}
                        icon={
                            <Icon
                                name='filter'
                                size={30}
                                color={theme.colors.blue}
                            />}
                        title="Filter by university"
                        titleStyle={{ fontFamily: theme.fonts.bold, color: theme.colors.blue }}
                        buttonStyle={{
                            borderColor: theme.colors.blue, borderRadius: theme.borderRadius.button, borderWidth: 1
                        }}
                        type='outline'
                        onPress={() => { setShowFilter(true) }}
                    />
                }

                {showFilter &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <DropDownPicker
                            items={universities}
                            containerStyle={{ height: 40, width: '70%' }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => { setSelectedUni(item.value); fitlerCourses(search, item.value); }}
                            placeholder="Select an university"
                            placeholderStyle={{ fontFamily: theme.fonts.regular }}
                            labelStyle={{ fontFamily: theme.fonts.regular }}
                        />
                        <Icon
                            name='times'
                            size={30}
                            color='red'
                            onPress={() => { setShowFilter(false); fitlerCourses(search, ''); setSelectedUni('') }}
                        />
                    </View>

                }

                <View style={styles.listContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        {showCourses()}
                    </ScrollView>
                </View>
                <AppSnackBar
                    visible={visible}
                    onDismiss={() => removeSnackBar()}
                    message={message}
                    color={theme.colors.blue}
                />
                <Foot
                    color={theme.colors.blue}
                    icon="plus-circle"
                    textTop="You couldn't find your course?"
                    textBottom="No problem! Create one here"
                    iconAction={() => { navigation.navigate('AddCourse') }}
                />
                <StatusBar style="auto" />
            </View>
        );
    }
    else {
        return (
            <Loading />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
});
