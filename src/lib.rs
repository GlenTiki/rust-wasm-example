#[cfg(test)]
mod tests {
    use add_one;

    #[test]
    fn it_works() {
        assert_eq!(add_one(3), 4);
    }
}

#[no_mangle]
pub extern fn add_one(a: u32) -> u32 {
    a + 1
}